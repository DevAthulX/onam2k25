export class AudioManager {
  private audioContext: AudioContext | null = null;
  private isInitialized = false;

  constructor() {
    // Audio context can only be created after user interaction
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.isInitialized = true;
    } catch (error) {
      console.warn('Audio not supported:', error);
    }
  }

  async playTone(frequency: number, duration: number, volume: number = 0.1) {
    if (!this.audioContext) {
      await this.initialize();
    }

    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Play celebration chime
  async playCelebrationChime() {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C (one octave higher)
    
    for (let i = 0; i < notes.length; i++) {
      setTimeout(() => {
        this.playTone(notes[i], 0.3);
      }, i * 150);
    }
  }

  // Play notification sound
  async playNotification() {
    await this.playTone(800, 0.2);
    setTimeout(() => {
      this.playTone(600, 0.2);
    }, 100);
  }

  // Play surprise sound effect
  async playSurpriseEffect() {
    const frequencies = [400, 500, 600, 700, 800];
    
    frequencies.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.1, 0.05);
      }, i * 50);
    });
  }

  // Play fireworks sound
  async playFireworksSound() {
    // Simulate firework explosion with multiple frequencies
    const explosionFreqs = [200, 300, 400, 500];
    
    explosionFreqs.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.5, 0.08);
      }, i * 100);
    });
  }
}

export const audioManager = new AudioManager();
