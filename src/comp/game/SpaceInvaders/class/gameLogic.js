import { Player, Projectile } from "./player";
import { InvaderProjectileClass, Grid } from "./invader";
import { createParticles, backgroundParticles } from "./particle";
import { setupKeyboard } from "./keyboard";

export function startGame(canvas, destroyedInvaders, playerHits) {
  const c = canvas.getContext("2d");
  canvas.width = 1024;
  canvas.height = 576;

  const player = new Player(canvas);
  const projectiles = [];
  const grids = [];
  const invaderProjectiles = [];
  const particles = [];

  let frames = 0; // spawn grids at intervals
  let randomInterval = Math.floor(Math.random() * 500 + 500);

  backgroundParticles(particles, canvas); // background animation
  const keys = setupKeyboard({ player, projectiles, Projectile }); // keyboard

  // Game Logic
  function animate() {
    requestAnimationFrame(animate); // image loop
    c.clearRect(0, 0, canvas.width, canvas.height);

    player.update(c); // player

    // particles
    particles.forEach((particle, i) => {
      // reposition background particles
      if (particle.position.y - particle.radius >= canvas.height) {
        particle.position.x = Math.random() * canvas.width;
        particle.position.y = -particle.radius;
      }
      if (particle.opacity <= 0) {
        // garbage collection
        setTimeout(() => {
          particles.splice(i, 1);
        }, 0);
      } else {
        particle.update(c);
      }
    });

    /* Projectile */
    // invader projectile
    invaderProjectiles.forEach((invaderProjectile, index) => {
      if (
        invaderProjectile.position.y + invaderProjectile.height >=
        canvas.height
      ) {
        // garbage collection
        invaderProjectiles.splice(index, 1);
      } else invaderProjectile.update(c);

      // collision detection, invader hits player
      if (
        invaderProjectile.position.y + invaderProjectile.height >=
          player.position.y &&
        invaderProjectile.position.y <= player.position.y + player.height &&
        invaderProjectile.position.x + invaderProjectile.width >=
          player.position.x &&
        invaderProjectile.position.x <= player.position.x + player.width
      ) {
        // projectile hits player
        invaderProjectiles.splice(index, 1); // garbage collection
        playerHits.push(true);

        createParticles(
          {
            object: player,
            color: "white",
            fades: true,
          },
          particles
        );
      }
    });
    // player projectile
    projectiles.forEach((projectile, index) => {
      if (projectile.position.y + projectile.radius <= 0) {
        setTimeout(() => {
          // garbage collection
          projectiles.splice(index, 1);
        }, 0);
      } else {
        projectile.update(c);
      }
    });
    /* Projectile */

    // invader
    grids.forEach((grid, gridIndex) => {
      grid.update(canvas);

      // spawning projectiles
      if (frames % 100 === 0 && grid.invaders.length > 0) {
        grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(
          invaderProjectiles,
          InvaderProjectileClass
        );
      }

      grid.invaders.forEach((invader, i) => {
        invader.update({ velocity: grid.velocity, c });

        // collision detection, projectile hit enemy
        projectiles.forEach((projectile, j) => {
          if (
            projectile.position.y - projectile.radius <=
              invader.position.y + invader.height &&
            projectile.position.x + projectile.radius >= invader.position.x &&
            projectile.position.x - projectile.radius <=
              invader.position.x + invader.width &&
            projectile.position.y + projectile.radius >= invader.position.y
          ) {
            // collision detection
            setTimeout(() => {
              const invaderFound = grid.invaders.find(
                (invader2) => invader2 === invader
              );
              const projectileFound = projectiles.find(
                (projectile2) => projectile2 === projectile
              );

              // remove invader & projectile
              if (invaderFound && projectileFound) {
                projectiles.splice(j, 1);
                grid.invaders.splice(i, 1);

                // score
                destroyedInvaders.push(invader);

                // particles
                createParticles(
                  {
                    object: invader,
                    fades: true,
                  },
                  particles
                );

                if (grid.invaders.length > 0) {
                  const firstInvader = grid.invaders[0];
                  const lastInvader = grid.invaders[grid.invaders.length - 1];

                  grid.width =
                    lastInvader.position.x -
                    firstInvader.position.x +
                    lastInvader.width;
                  grid.position.x = firstInvader.position.x;
                } else {
                  // garbage collection
                  grids.splice(gridIndex, 1);
                }
              }
            }, 0);
          }
        });
      });
    });

    // update speed & rotation
    const playerVelocity = 5;
    const playerRotation = 0.15;
    if (keys.a.pressed && player.position.x >= 0) {
      player.velocity.x = -playerVelocity;
      player.rotation = -playerRotation;
    } else if (
      keys.d.pressed &&
      player.position.x + player.width <= canvas.width
    ) {
      player.velocity.x = +playerVelocity;
      player.rotation = playerRotation;
    } else {
      player.velocity.x = 0;
      player.rotation = 0;
    }

    // spawning enemies
    if (frames % randomInterval === 0) {
      grids.push(new Grid());
      frames = 0;
      randomInterval = Math.floor(Math.random() * 500 + 500);
    }

    frames++;
  }
  animate();

  return { player };
}
