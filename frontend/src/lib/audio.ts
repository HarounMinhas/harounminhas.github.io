class GlobalAudio {
  private audio = new Audio();
  private current?: { id: string; url: string };
  private listeners = new Set<() => void>();

  play(id: string, url?: string) {
    if (!url) return;

    if (this.current?.id === id && !this.audio.paused) {
      this.audio.pause();
      this.emit();
      return;
    }

    if (this.current?.id !== id) {
      this.audio.src = url;
    }

    this.current = { id, url };
    void this.audio.play();
    this.emit();
  }

  pause() {
    this.audio.pause();
    this.emit();
  }

  isPlaying(id?: string) {
    return !!this.current && this.current.id === id && !this.audio.paused;
  }

  volume(value: number) {
    this.audio.volume = value;
    this.emit();
  }

  onChange(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit() {
    this.listeners.forEach((listener) => listener());
  }
}

export const globalAudio = new GlobalAudio();
