// player.js
export function createPlayer(canvas) {
  const image = new Image();
  image.src = "/images/spaceInvaders/playerShip1_green.webp";
  return new Promise((resolve) => {
    image.onload = () => {
      const scale = 0.5;
      resolve({
        position: {
          x: canvas.width / 2 - (image.width * scale) / 2,
          y: canvas.height - image.height * scale - 20,
        },
        velocity: { x: 0, y: 0 },
        rotation: 0,
        opacity: 1,
        image: image,
        width: image.width * scale,
        height: image.height * scale,
      });
    };
  });
}

export function updatePlayer(
  playerState,
  keys,
  playerVelocity,
  playerRotation
) {
  if (!playerState) return null;
  let newVelocityX = 0;
  let newRotation = 0;
  if (keys.a.pressed && playerState.position.x >= 0) {
    newVelocityX = -playerVelocity;
    newRotation = -playerRotation;
  } else if (
    keys.d.pressed &&
    playerState.position.x + playerState.width <= window.innerWidth
  ) {
    newVelocityX = playerVelocity;
    newRotation = playerRotation;
  }
  return {
    ...playerState,
    velocity: { ...playerState.velocity, x: newVelocityX },
    rotation: newRotation,
    position: {
      x: playerState.position.x + newVelocityX,
      y: playerState.position.y + playerState.velocity.y,
    },
  };
}

export function drawPlayer(c, playerState) {
  if (playerState?.image) {
    c.save();
    c.globalAlpha = playerState.opacity;
    c.translate(
      playerState.position.x + playerState.width / 2,
      playerState.position.y + playerState.height / 2
    );
    c.rotate(playerState.rotation);
    c.translate(
      -playerState.position.x - playerState.width / 2,
      -playerState.position.y - playerState.height / 2
    );
    c.drawImage(
      playerState.image,
      playerState.position.x,
      playerState.position.y,
      playerState.width,
      playerState.height
    );
    c.restore();
  }
}
