let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(freq: number, start: number, duration: number, type: OscillatorType = "sine", volume = 0.12) {
  const c = getContext();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  const t0 = c.currentTime + start;
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(gain).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

export const playMove = (mark: "X" | "O") => tone(mark === "X" ? 520 : 390, 0, 0.14, "triangle");

export function playWin() {
  [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.22, "triangle", 0.14));
}

export function playDraw() {
  tone(330, 0, 0.18, "sine");
  tone(262, 0.16, 0.28, "sine");
}
