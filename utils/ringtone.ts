// Utility to create a phone ringtone using Web Audio API
export function createPhoneRingtone(): (() => void) | undefined {
    if (typeof window === 'undefined') return undefined;

    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContext();

        const playTone = (frequency: number, duration: number, delay: number) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay);
            gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + delay + 0.01);
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + delay + duration);

            oscillator.start(audioContext.currentTime + delay);
            oscillator.stop(audioContext.currentTime + delay + duration);
        };

        // Classic phone ring pattern (two rings, pause, repeat)
        const ringPattern = () => {
            playTone(480, 0.4, 0);    // First ring
            playTone(620, 0.4, 0);    // Harmony
            playTone(480, 0.4, 0.5);  // Second ring
            playTone(620, 0.4, 0.5);  // Harmony
        };

        ringPattern();
        const interval = setInterval(ringPattern, 2000);

        // Return cleanup function
        return () => {
            clearInterval(interval);
            audioContext.close();
        };
    } catch (err) {
        console.log('Web Audio API not supported:', err);
        return undefined;
    }
}
