"use client";
/* eslint-disable no-console */

import { useCallback, useEffect, useRef, useState } from "react";
import ProjectVersionBanner from "../components/ProjectVersionBanner";
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

const LOG_PREFIX = "[EyeTracker]" as const;
const DETECTION_LOG_THROTTLE_MS = 750;

type EyeBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type DetectionState = "idle" | "searching" | "detected";

const detectionStateMessages: Record<DetectionState, string> = {
  idle: "",
  searching: "Zoeken naar gezicht en ogen...",
  detected: "Ogen gedetecteerd! Live tracking actief.",
};

const clamp = (value: number, min: number, max: number) => {
  if (Number.isNaN(value)) {
    return min;
  }
  return Math.min(Math.max(value, min), max);
};

const computeBoundingBox = (
  keypoints: Keypoint[],
  indices: number[],
  dimensions: { width: number; height: number },
): EyeBox | null => {
  const { width, height } = dimensions;

  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  let hasValidPoint = false;

  indices.forEach((index) => {
    const point = keypoints[index];
    if (!point) {
      return;
    }

    let x = point.x;
    let y = point.y;

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return;
    }

    // MediaPipe returns normalized coordinates in the range [0, 1]. Convert
    // those to pixel coordinates based on the rendered video size. When the
    // model already returns absolute pixel values (as some backends do), we
    // keep them untouched by checking for values outside the normalized range.
    if (Math.abs(x) <= 1.5 && Math.abs(y) <= 1.5) {
      x *= width;
      y *= height;
    }

    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    hasValidPoint = true;
  });

  if (!hasValidPoint) {
    return null;
  }

  const clampedMinX = clamp(minX, 0, width);
  const clampedMinY = clamp(minY, 0, height);
  const clampedMaxX = clamp(maxX, 0, width);
  const clampedMaxY = clamp(maxY, 0, height);

  return {
    x: clampedMinX,
    y: clampedMinY,
    width: Math.max(0, clampedMaxX - clampedMinX),
    height: Math.max(0, clampedMaxY - clampedMinY),
  };
};

const EyeTrackerProject = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const detectorRef = useRef<FaceLandmarksDetector | null>(null);
  const animationFrameRef = useRef<number>();
  const streamRef = useRef<MediaStream | null>(null);
  const detectionIssueRef = useRef<string | null>(null);
  const lastDetectionLogRef = useRef<number>(0);
  const detectionStateRef = useRef<DetectionState>("idle");

  const [status, setStatus] = useState<string>(
    "Loading the eye tracking model. This usually takes a few seconds...",
  );
  const [error, setError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [isStartingCamera, setIsStartingCamera] = useState(false);
  const [detectionState, setDetectionState] = useState<DetectionState>("idle");
  const [detectionFeedback, setDetectionFeedback] = useState("");

  const updateStatus = useCallback(
    (message: string) => {
      console.log(`${LOG_PREFIX} Status update: ${message || "(leeg)"}`);
      setStatus(message);
    },
    [setStatus],
  );

  const updateError = useCallback(
    (message: string | null) => {
      if (message) {
        console.log(`${LOG_PREFIX} Error message set: ${message}`);
      } else {
        console.log(`${LOG_PREFIX} Error message cleared.`);
      }
      setError(message);
    },
    [setError],
  );

  const updateDetectionFeedback = useCallback(
    (nextState: DetectionState) => {
      if (detectionStateRef.current === nextState) {
        return;
      }

      detectionStateRef.current = nextState;
      setDetectionState(nextState);

      const feedback = detectionStateMessages[nextState];
      setDetectionFeedback(feedback);
      console.log(
        `${LOG_PREFIX} Detection state changed to "${nextState}"${
          feedback ? ` (${feedback})` : ""
        }.`,
      );
    },
    [setDetectionFeedback, setDetectionState],
  );

  const logDetectionIssue = useCallback(
    (message: string) => {
      if (detectionIssueRef.current === message) {
        return;
      }

      detectionIssueRef.current = message;
      console.log(`${LOG_PREFIX} ${message}`);
    },
    [],
  );

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log(`${LOG_PREFIX} Skipping canvas clear: canvas element is missing.`);
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      console.log(`${LOG_PREFIX} Skipping canvas clear: 2D context unavailable.`);
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log(`${LOG_PREFIX} Canvas cleared.`);
  }, []);

  const runDetectionOnce = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const detector = detectorRef.current;

    if (!video || !canvas || !detector) {
      const missing = [
        !video ? "video element" : null,
        !canvas ? "canvas element" : null,
        !detector ? "detector" : null,
      ]
        .filter(Boolean)
        .join(", ");

      if (missing) {
        logDetectionIssue(`Detection skipped: missing ${missing}.`);
      }
      updateDetectionFeedback("searching");
      return;
    }

    if (video.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) {
      logDetectionIssue(
        `Detection waiting: video readyState ${video.readyState} is insufficient for processing.`,
      );
      updateDetectionFeedback("searching");
      return;
    }

    if (!video.videoWidth || !video.videoHeight) {
      logDetectionIssue("Detection waiting: video dimensions are not available yet.");
      updateDetectionFeedback("searching");
      return;
    }

    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      console.log(
        `${LOG_PREFIX} Resizing canvas overlay to ${video.videoWidth}x${video.videoHeight}.`,
      );
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    let predictions;
    try {
      predictions = await detector.estimateFaces(video, { flipHorizontal: false });
    } catch (detectionError) {
      console.error(`${LOG_PREFIX} Error while estimating faces.`, detectionError);
      logDetectionIssue("Detection error: the model could not estimate facial landmarks.");
      updateDetectionFeedback("searching");
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      logDetectionIssue("Detection skipped: unable to access the 2D canvas context.");
      updateDetectionFeedback("searching");
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (!predictions.length) {
      logDetectionIssue("Geen gezicht gedetecteerd in dit frame.");
      updateDetectionFeedback("searching");
      return;
    }

    if (predictions.length > 1) {
      console.log(
        `${LOG_PREFIX} ${predictions.length} gezichten gedetecteerd. De eerste wordt gebruikt voor tracking.`,
      );
    }

    const { keypoints } = predictions[0];
    const dimensions = {
      width: canvas.width,
      height: canvas.height,
    };

    const leftEyeBox = computeBoundingBox(
      keypoints as Keypoint[],
      LEFT_EYE_INDICES,
      dimensions,
    );
    const rightEyeBox = computeBoundingBox(
      keypoints as Keypoint[],
      RIGHT_EYE_INDICES,
      dimensions,
    );

    const boxes: { label: string; box: EyeBox | null }[] = [
      { label: "linker", box: leftEyeBox },
      { label: "rechter", box: rightEyeBox },
    ];

    const missingEyes = boxes.filter(({ box }) => !box).map(({ label }) => label);

    context.lineWidth = 3;
    context.strokeStyle = "#22d3ee";
    context.fillStyle = "rgba(34, 211, 238, 0.2)";

    let hasValidBox = false;

    boxes.forEach(({ box }) => {
      if (!box) {
        return;
      }

      hasValidBox = true;
      context.fillRect(box.x, box.y, box.width, box.height);
      context.strokeRect(box.x, box.y, box.width, box.height);
    });

    if (!hasValidBox) {
      logDetectionIssue("Geen geldige oogkaders gevonden, hoewel er een gezicht is gedetecteerd.");
      updateDetectionFeedback("searching");
      return;
    }

    if (missingEyes.length > 0) {
      logDetectionIssue(
        `Niet alle ogen konden worden gevolgd: ${missingEyes.join(" en ")}.`,
      );
    } else {
      detectionIssueRef.current = null;
    }

    updateDetectionFeedback("detected");

    const now = Date.now();
    if (now - lastDetectionLogRef.current >= DETECTION_LOG_THROTTLE_MS) {
      lastDetectionLogRef.current = now;
      const details = boxes
        .map(({ label, box }) =>
          box
            ? `${label} oog → x=${box.x.toFixed(1)}, y=${box.y.toFixed(1)}, w=${box.width.toFixed(
                1,
              )}, h=${box.height.toFixed(1)}`
            : `${label} oog → niet gevonden`,
        )
        .join(" | ");
      console.log(`${LOG_PREFIX} ${details}`);
    }
  }, [
    logDetectionIssue,
    updateDetectionFeedback,
  ]);

  useEffect(() => {
    console.log(`${LOG_PREFIX} Component mounted. Initialising detector.`);
    let isCancelled = false;

    const loadDetector = async () => {
      try {
        updateStatus(
          "Loading the eye tracking model. This usually takes a few seconds...",
        );
        console.log(`${LOG_PREFIX} Loading TensorFlow and face landmarks model.`);
        const [{ createDetector, SupportedModels }, tf] = await Promise.all([
          import("@tensorflow-models/face-landmarks-detection"),
          import("@tensorflow/tfjs-core"),
        ]);
        await Promise.all([
          import("@tensorflow/tfjs-backend-webgl"),
          import("@tensorflow/tfjs-converter"),
        ]);
        console.log(`${LOG_PREFIX} TensorFlow packages imported.`);
        await tf.setBackend("webgl");
        console.log(`${LOG_PREFIX} TensorFlow backend set to WebGL.`);
        await tf.ready();
        console.log(`${LOG_PREFIX} TensorFlow backend ready.`);

        if (isCancelled) {
          console.log(`${LOG_PREFIX} Detector load cancelled before creation.`);
          return;
        }

        const detector = await createDetector(SupportedModels.MediaPipeFaceMesh, {
          runtime: "tfjs",
          refineLandmarks: true,
          maxFaces: 1,
        });
        console.log(`${LOG_PREFIX} Face landmarks detector created.`);

        if (isCancelled) {
          console.log(`${LOG_PREFIX} Detector load cancelled after creation. Disposing instance.`);
          await detector.dispose();
          return;
        }

        detectorRef.current = detector;
        setIsModelReady(true);
        console.log(`${LOG_PREFIX} Detector ready for use.`);
        updateStatus("Model ready. Start the camera to begin tracking your eyes.");
      } catch (modelError) {
        console.error(`${LOG_PREFIX} Failed to load detector.`, modelError);
        if (!isCancelled) {
          updateError(
            "We couldn't load the eye tracking model. Please refresh the page and try again.",
          );
          updateStatus("");
        }
      }
    };

    loadDetector();

    const videoElement = videoRef.current;

    return () => {
      console.log(`${LOG_PREFIX} Cleaning up detector and media resources.`);
      isCancelled = true;
      if (animationFrameRef.current) {
        console.log(`${LOG_PREFIX} Cancelling animation frame ${animationFrameRef.current}.`);
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
      if (detectorRef.current) {
        console.log(`${LOG_PREFIX} Disposing detector instance during cleanup.`);
        detectorRef.current.dispose();
        detectorRef.current = null;
      }
      if (videoElement) {
        console.log(`${LOG_PREFIX} Releasing video element resources.`);
        videoElement.pause();
        const { srcObject } = videoElement;
        if (srcObject instanceof MediaStream) {
          srcObject.getTracks().forEach((track) => {
            console.log(`${LOG_PREFIX} Stopping video element track (${track.kind}).`);
            track.stop();
          });
        }
        videoElement.srcObject = null;
      }
      if (streamRef.current) {
        console.log(`${LOG_PREFIX} Stopping stored media stream tracks.`);
        streamRef.current.getTracks().forEach((track) => {
          console.log(`${LOG_PREFIX} Stopping stored track (${track.kind}).`);
          track.stop();
        });
        streamRef.current = null;
      }
      updateDetectionFeedback("idle");
    };
  }, [updateDetectionFeedback, updateError, updateStatus]);

  useEffect(() => {
    if (!isCameraActive) {
      return;
    }

    console.log(`${LOG_PREFIX} Starting detection loop.`);
    updateDetectionFeedback("searching");
    let isCancelled = false;

    const detectionLoop = async () => {
      if (isCancelled) {
        return;
      }

      await runDetectionOnce();
      animationFrameRef.current = requestAnimationFrame(detectionLoop);
    };

    animationFrameRef.current = requestAnimationFrame(detectionLoop);
    console.log(`${LOG_PREFIX} First detection frame requested: ${animationFrameRef.current}.`);

    return () => {
      console.log(`${LOG_PREFIX} Stopping detection loop.`);
      isCancelled = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
    };
  }, [isCameraActive, runDetectionOnce, updateDetectionFeedback]);

  useEffect(() => {
    if (isCameraActive && isModelReady) {
      updateStatus("Camera active. Keep your eyes in view to see the live tracking.");
    }
  }, [isCameraActive, isModelReady, updateStatus]);

  const startCamera = async () => {
    console.log(`${LOG_PREFIX} Start camera requested.`);

    if (!navigator.mediaDevices?.getUserMedia) {
      updateError("Camera access isn't supported in this browser. Please try a different one.");
      updateStatus("Camera inactive.");
      return;
    }

    if (isStartingCamera) {
      console.log(`${LOG_PREFIX} Start camera ignored: already starting.`);
      return;
    }

    if (isCameraActive) {
      console.log(`${LOG_PREFIX} Start camera ignored: camera already active.`);
      return;
    }

    updateError(null);
    setIsStartingCamera(true);
    console.log(`${LOG_PREFIX} Requesting user media.`);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      console.log(`${LOG_PREFIX} Media stream received.`);
      streamRef.current = stream;

      const video = videoRef.current;
      if (!video) {
        throw new Error("Video element missing");
      }

      video.srcObject = stream;
      console.log(`${LOG_PREFIX} Video element linked to media stream.`);

      await video.play();
      console.log(`${LOG_PREFIX} Video playback started.`);

      setIsCameraActive(true);
      console.log(`${LOG_PREFIX} Camera marked as active.`);
      updateStatus(
        isModelReady
          ? "Camera active. Keep your eyes in view to see the live tracking."
          : "Camera active. Eye tracking will start as soon as the model finishes loading.",
      );
      updateDetectionFeedback("searching");
    } catch (cameraError) {
      console.error(`${LOG_PREFIX} Unable to start the camera.`, cameraError);
      updateError(
        "We couldn't access the camera. Please check your permissions and try again.",
      );
      updateStatus("Camera inactive.");
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          console.log(`${LOG_PREFIX} Stopping track after failure (${track.kind}).`);
          track.stop();
        });
        streamRef.current = null;
      }
      const video = videoRef.current;
      if (video) {
        video.srcObject = null;
      }
      updateDetectionFeedback("idle");
    } finally {
      setIsStartingCamera(false);
      console.log(`${LOG_PREFIX} Start camera sequence completed.`);
    }
  };

  const stopCamera = useCallback(() => {
    console.log(`${LOG_PREFIX} Stop camera requested.`);
    const video = videoRef.current;
    if (video?.srcObject instanceof MediaStream) {
      console.log(
        `${LOG_PREFIX} Stopping ${video.srcObject.getTracks().length} track(s) from the video element.`,
      );
      video.srcObject.getTracks().forEach((track) => {
        console.log(`${LOG_PREFIX} Stopping video element track (${track.kind}).`);
        track.stop();
      });
      video.srcObject = null;
    }

    if (streamRef.current) {
      console.log(`${LOG_PREFIX} Releasing stored media stream.`);
      streamRef.current.getTracks().forEach((track) => {
        console.log(`${LOG_PREFIX} Stopping stored track (${track.kind}).`);
        track.stop();
      });
      streamRef.current = null;
    }

    if (video) {
      video.pause();
    }

    clearCanvas();
    setIsCameraActive(false);
    console.log(`${LOG_PREFIX} Camera marked as inactive.`);
    updateDetectionFeedback("idle");
    updateStatus("Camera stopped. Start the camera again to resume tracking.");
  }, [clearCanvas, updateDetectionFeedback, updateStatus]);

  const detectionFeedbackClassName =
    detectionState === "detected" ? "text-emerald-600" : "text-sky-600";

  return (
    <div className="space-y-6">
      <ProjectVersionBanner className="max-w-2xl" />

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
        {detectionFeedback && (
          <p className={`text-sm ${detectionFeedbackClassName}`}>{detectionFeedback}</p>
        )}
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
