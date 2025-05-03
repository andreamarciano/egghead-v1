// invaderProjectile.js
export function createInvaderProjectile({ position, velocity }) {
  return {
    position: { ...position },
    velocity: { ...velocity },
    width: 3,
    height: 10,
    color: "white",
  };
}

export function updateInvaderProjectile(invaderProjectileState) {
  if (!invaderProjectileState) return null;
  return {
    ...invaderProjectileState,
    position: {
      x: invaderProjectileState.position.x + invaderProjectileState.velocity.x,
      y: invaderProjectileState.position.y + invaderProjectileState.velocity.y,
    },
  };
}

export function drawInvaderProjectile(c, invaderProjectileState) {
  if (invaderProjectileState) {
    c.fillStyle = invaderProjectileState.color;
    c.fillRect(
      invaderProjectileState.position.x,
      invaderProjectileState.position.y,
      invaderProjectileState.width,
      invaderProjectileState.height
    );
  }
}
