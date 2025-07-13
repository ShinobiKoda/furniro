import confetti from "canvas-confetti";

export function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70, // wider spread
    origin: { y: 0.6 }, // burst from lower point (like a popped balloon)
    gravity: 1.2, // faster fall
    scalar: 1.0, // size of confetti
  });
}
