import confetti from "canvas-confetti";

export function triggerConfetti() {
  confetti({
    particleCount: 200,
    spread: 70, 
    origin: { y: 0.6 }, 
    gravity: 1.2, 
    scalar: 1.5, 
  });
}
