// grid.js
import { createInvader } from "./invader";

export async function createGrid(canvas) {
  const cols = Math.floor(Math.random() * 10 + 5);
  const rows = Math.floor(Math.random() * 5 + 2);
  const invaders = [];

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const invader = await createInvader({
        position: { x: x * 30, y: y * 30 },
      });
      invaders.push(invader);
    }
  }

  const gridWidth = cols * 30;

  return {
    position: { x: 0, y: 0 },
    velocity: { x: 3, y: 0 },
    invaders: invaders,
    width: gridWidth,
  };
}

export function updateGrid(gridState, canvas) {
  if (!gridState) return null;
  let newVelocityY = 0;
  let newVelocityX = gridState.velocity.x;
  let newPositionX = gridState.position.x + gridState.velocity.x;
  let newPositionY = gridState.position.y + gridState.velocity.y;

  const hitRight = newPositionX + gridState.width >= canvas.width;
  const hitLeft = newPositionX <= 0;

  if (hitRight || hitLeft) {
    newVelocityX *= -1;
    newVelocityY = 30;
    newPositionY += 30;
  }

  return {
    ...gridState,
    velocity: { x: newVelocityX, y: newVelocityY },
    position: { x: newPositionX, y: newPositionY },
  };
}

export function drawGrid(c, gridState) {
  if (gridState?.invaders) {
    gridState.invaders.forEach((invader) => {
      if (invader) {
        drawInvader(c, invader);
      }
    });
  }
}
