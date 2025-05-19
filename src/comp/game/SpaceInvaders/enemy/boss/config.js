const bossConfig = {
  stats: {
    width: 1000,
    height: 250,
    lives: 1000,
    score: 5000,
  },
  spawn: 10000, // cambia - 10k
  gunOffsets: {
    small: [157, 387, 607, 837],
    medium: [272, 722],
    large: [495],
  },
  weakPoints: {
    count: 4,
    spaces: [
      { x: 100, y: 184, width: 29, height: 6 },
      { x: 190, y: 184, width: 49, height: 6 },
      { x: 310, y: 184, width: 49, height: 6 },
      { x: 420, y: 184, width: 39, height: 6 },
      { x: 540, y: 184, width: 39, height: 6 },
      { x: 640, y: 184, width: 49, height: 6 },
      { x: 760, y: 184, width: 49, height: 6 },
      { x: 870, y: 184, width: 29, height: 6 },
    ],
  },
  hitParticles: {
    color: "#2B3345",
    opacity: 0.9,
    count: 100,
    radiusRange: [2, 6],
    velocityRange: [2, 6],
  },
};

export default bossConfig;
