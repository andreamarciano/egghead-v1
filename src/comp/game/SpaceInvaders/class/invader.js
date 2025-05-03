// invader.js
export function createInvader({ position }) {
  const image = new Image();
  image.src = "/images/spaceInvaders/invader.png";
  return new Promise((resolve) => {
    image.onload = () => {
      const scale = 1;
      resolve({
        position: { ...position },
        velocity: { x: 0, y: 0 },
        image: image,
        width: image.width * scale,
        height: image.height * scale,
      });
    };
  });
}

export function updateInvader(invaderState, gridVelocity) {
  if (!invaderState) return null;
  return {
    ...invaderState,
    position: {
      x: invaderState.position.x + gridVelocity.x,
      y: invaderState.position.y + gridVelocity.y,
    },
  };
}

export function drawInvader(c, invaderState) {
  if (invaderState?.image) {
    c.drawImage(
      invaderState.image,
      invaderState.position.x,
      invaderState.position.y,
      invaderState.width,
      invaderState.height
    );
  }
}

export function shootInvaderProjectile(invaderState, InvaderProjectileClass) {
  if (!invaderState) return null;
  return new InvaderProjectileClass({
    position: {
      x: invaderState.position.x + invaderState.width / 2,
      y: invaderState.position.y + invaderState.height,
    },
    velocity: { x: 0, y: 5 },
  });
}
