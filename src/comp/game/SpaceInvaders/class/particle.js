// particle.js
export function createParticle({
  position,
  velocity,
  radius,
  color = "#BAA0DE",
  fades,
}) {
  return {
    position: { ...position },
    velocity: { ...velocity },
    radius,
    color,
    opacity: 1,
    fades,
  };
}

export function updateParticle(particleState) {
  if (!particleState) return null;
  let newOpacity = particleState.opacity;
  if (particleState.fades) {
    newOpacity -= 0.01;
  }
  return {
    ...particleState,
    position: {
      x: particleState.position.x + particleState.velocity.x,
      y: particleState.position.y + particleState.velocity.y,
    },
    opacity: newOpacity > 0 ? newOpacity : 0,
  };
}

export function drawParticle(c, particleState) {
  if (particleState) {
    c.save();
    c.globalAlpha = particleState.opacity;
    c.beginPath();
    c.arc(
      particleState.position.x,
      particleState.position.y,
      particleState.radius,
      0,
      Math.PI * 2
    );
    c.fillStyle = particleState.color;
    c.fill();
    c.closePath();
    c.restore();
  }
}
