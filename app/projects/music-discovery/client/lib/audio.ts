class GlobalAudio {
  private audio: HTMLAudioElement | null = null;
  private current?: { id: string; url: string };
  private listeners = new Set<() => void>();

  private ensureAudio() {
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.volume = 0.8;
      this.audio.addEventListener('ended', () => this.emit());
      this.audio.addEventListener('pause', () => this.emit());
    }
    return this.audio;
  }

  play(id: string, url?: string) {
    if (!url) return;
    const audio = this.ensureAudio();

    if (this.current?.id === id && !audio.paused) {
      audio.pause();
      this.emit();
      return;
    }

    if (this.current?.id !== id) {
      audio.src = url;
    }

    this.current = { id, url };
    void audio.play();
    this.emit();
  }

  pause() {
    const audio = this.ensureAudio();
    audio.pause();
    this.emit();
  }

  isPlaying(id?: string) {
    const audio = this.ensureAudio();
    return !!this.current && this.current.id === id && !audio.paused;
  }

  volume(value: number) {
    const audio = this.ensureAudio();
    audio.volume = value;
    this.emit();
  }

  onChange(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    this.listeners.forEach((listener) => listener());
  }
}

export const globalAudio = new GlobalAudio();
