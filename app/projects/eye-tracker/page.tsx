"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  FaceLandmarksDetector,
  Keypoint,
} from "@tensorflow-models/face-landmarks-detection";

const LEFT_EYE_INDICES = [
  33, 133, 160, 159, 158, 157, 173, 155, 154, 153, 145, 144, 163, 7, 246, 161,
];
const RIGHT_EYE_INDICES = [
  362, 263, 387, 386, 385, 384, 398, 382, 381, 380, 374, 373, 390, 249, 466,
  388,
];

type EyeBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const computeBoundingBox = (
  keypoints: Keypoint[],
  indices: number[],
): EyeBox | null => {
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  indices.forEach((index) => {
    const point = keypoints[index];
    if (!point) {
      return;
    }

    minX = Math.min(minX, point.x);
    minY = Math.min(minY, point.y);
    maxX = Math.max(maxX, point.x);
    maxY = Math.max(maxY, point.y);
  });

  if (!Number.isFinite(minX) || !Number.isFinite(minY)) {
    return null;
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
};

const EyeTrackerProject = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const detectorRef = useRef<FaceLandmarksDetector | null>(null);
  const animationFrameRef = useRef<number>();
  const streamRef = useRef<MediaStream | null>(null);

  const [status, setStatus] = useState<string>(
    "Loading the eye tracking model. This usually takes a few seconds...",
  );
  const [error, setError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [isStartingCamera, setIsStartingCamera] = useState(false);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const runDetectionOnce = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const detector = detectorRef.current;

    if (!video || !canvas || !detector) {
      return;
    }

    if (video.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) {
      return;
    }

    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    const predictions = await detector.estimateFaces(video, {
      flipHorizontal: false,
    });

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (!predictions.length) {
      return;
    }

    const { keypoints } = predictions[0];
    const leftEyeBox = computeBoundingBox(keypoints as Keypoint[], LEFT_EYE_INDICES);
    const rightEyeBox = computeBoundingBox(keypoints as Keypoint[], RIGHT_EYE_INDICES);

    context.lineWidth = 3;
    context.strokeStyle = "#22d3ee";
    context.fillStyle = "rgba(34, 211, 238, 0.2)";

    [leftEyeBox, rightEyeBox].forEach((box) => {
      if (!box) {
        return;
      }

      context.fillRect(box.x, box.y, box.width, box.height);
      context.strokeRect(box.x, box.y, box.width, box.height);
    });
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const loadDetector = async () => {
      try {
        setStatus("Loading the eye tracking model. This usually takes a few seconds...");
        const [{ createDetector, SupportedModels }, tf] = await Promise.all([
          import("@tensorflow-models/face-landmarks-detection"),
          import("@tensorflow/tfjs-core"),
        ]);
        await import("@tensorflow/tfjs-backend-webgl");
        await tf.setBackend("webgl");
        await tf.ready();

        if (isCancelled) {
          return;
        }

        const detector = await createDetector(SupportedModels.MediaPipeFaceMesh, {
          runtime: "tfjs",
          refineLandmarks: true,
          maxFaces: 1,
        });

        if (isCancelled) {
          await detector.dispose();
          return;
        }

        detectorRef.current = detector;
        setIsModelReady(true);
        setStatus("Model ready. Start the camera to begin tracking your eyes.");
      } catch (modelError) {
        console.error(modelError);
        if (!isCancelled) {
          setError("We couldn't load the eye tracking model. Please refresh the page and try again.");
          setStatus("");
        }
      }
    };

    loadDetector();

    const videoElement = videoRef.current;

    return () => {
      isCancelled = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
      if (detectorRef.current) {
        detectorRef.current.dispose();
        detectorRef.current = null;
      }
      if (videoElement) {
        videoElement.pause();
        const { srcObject } = videoElement;
        if (srcObject instanceof MediaStream) {
          srcObject.getTracks().forEach((track) => track.stop());
        }
        videoElement.srcObject = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isCameraActive) {
      return;
    }

    let isCancelled = false;

    const detectionLoop = async () => {
      if (isCancelled) {
        return;
      }

      await runDetectionOnce();
      animationFrameRef.current = requestAnimationFrame(detectionLoop);
    };

    animationFrameRef.current = requestAnimationFrame(detectionLoop);

    return () => {
      isCancelled = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
    };
  }, [isCameraActive, runDetectionOnce]);

  useEffect(() => {
    if (isCameraActive && isModelReady) {
      setStatus("Camera active. Keep your eyes in view to see the live tracking.");
    }
  }, [isCameraActive, isModelReady]);

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera access isn't supported in this browser. Please try a different one.");
      return;
    }

    if (isStartingCamera || isCameraActive) {
      return;
    }

    setError(null);
    setIsStartingCamera(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      streamRef.current = stream;

      const video = videoRef.current;
      if (!video) {
        throw new Error("Video element missing");
      }

      video.srcObject = stream;
      await video.play();

      setIsCameraActive(true);
      setStatus(
        isModelReady
          ? "Camera active. Keep your eyes in view to see the live tracking."
          : "Camera active. Eye tracking will start as soon as the model finishes loading.",
      );
    } catch (cameraError) {
      console.error(cameraError);
      setError("We couldn't access the camera. Please check your permissions and try again.");
      setStatus("Camera inactive.");
    } finally {
      setIsStartingCamera(false);
    }
  };

  const stopCamera = () => {
    const video = videoRef.current;
    if (video?.srcObject instanceof MediaStream) {
      video.srcObject.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    video?.pause();
    clearCanvas();
    setIsCameraActive(false);
    setStatus("Camera stopped. Start the camera again to resume tracking.");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Live Eye Tracking Camera</h1>
        <p className="text-gray-600">
          Allow camera access to preview the live video feed. Once the model detects your face,
          glowing squares will follow your eyes in real time.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={startCamera}
          disabled={isStartingCamera || isCameraActive}
          className="rounded-md bg-sky-500 px-4 py-2 text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isStartingCamera ? "Starting camera..." : "Start camera"}
        </button>
        {isCameraActive && (
          <button
            type="button"
            onClick={stopCamera}
            className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100"
          >
            Stop camera
          </button>
        )}
      </div>

      <div className="relative w-full max-w-3xl overflow-hidden rounded-xl bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          playsInline
          autoPlay
          muted
        />
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
        {!isCameraActive && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center text-sm font-medium text-white/80">
            Camera preview will appear here once you start the camera.
          </div>
        )}
      </div>

      <div className="space-y-1">
        {status && <p className="text-sm text-gray-700">{status}</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <div className="space-y-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
        <p className="font-medium">Tips for best results</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Make sure you are in a well-lit environment so your eyes are easy to detect.</li>
          <li>Position your face roughly one arm&apos;s length away from the camera.</li>
          <li>Keep your eyes visible and avoid heavy glare from glasses.</li>
        </ul>
      </div>
    </div>
  );
};

export default EyeTrackerProject;
