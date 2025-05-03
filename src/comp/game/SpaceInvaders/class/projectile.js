// projectile.js
export function createProjectile({ position, velocity }) {
  return {
    position: { ...position },
    velocity: { ...velocity },
    radius: 4,
    color: "red",
  };
}

export function updateProjectile(projectileState) {
  if (!projectileState) return null;
  return {
    ...projectileState,
    position: {
      x: projectileState.position.x + projectileState.velocity.x,
      y: projectileState.position.y + projectileState.velocity.y,
    },
  };
}

export function drawProjectile(c, projectileState) {
  if (projectileState) {
    c.beginPath();
    c.arc(
      projectileState.position.x,
      projectileState.position.y,
      projectileState.radius,
      0,
      Math.PI * 2
    );
    c.fillStyle = projectileState.color;
    c.fill();
    c.closePath();
  }
}
