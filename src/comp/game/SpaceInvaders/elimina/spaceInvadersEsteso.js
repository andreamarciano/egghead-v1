let game = {
  over: false,
  active: true,
};

export function startGame(canvas, destroyedInvaders) {
  game.over = false;
  game.active = true;

  const c = canvas.getContext("2d");
  canvas.width = 1024;
  canvas.height = 700;

  class Player {
    constructor() {
      this.velocity = {
        x: 0,
        y: 0,
      };

      this.rotation = 0;
      this.opacity = 1;

      const image = new Image();
      image.src = "/images/spaceInvaders/playerShip1_green.webp";
      image.onload = () => {
        const scale = 0.5;
        this.image = image;
        this.width = image.width * scale;
        this.height = image.height * scale;
        this.position = {
          x: canvas.width / 2 - this.width / 2,
          y: canvas.height - this.height - 20,
        };
      };
    }

    draw() {
      c.save();

      c.globalAlpha = this.opacity; // player lose

      // canvas rotation
      c.translate(
        this.position.x + this.width / 2,
        this.position.y + this.height / 2
      );
      c.rotate(this.rotation);
      c.translate(
        -this.position.x - this.width / 2,
        -this.position.y - this.height / 2
      );

      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );

      c.restore();
    }

    update() {
      if (this.image) {
        this.draw();
        this.position.x += this.velocity.x;
      }
    }
  }

  class Projectile {
    constructor({ position, velocity }) {
      this.position = position;
      this.velocity = velocity;
      this.radius = 4;
    }

    draw() {
      c.beginPath();
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = "red";
      c.fill();
      c.closePath();
    }

    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }

  class Particle {
    constructor({ position, velocity, radius, color, fades }) {
      this.position = position;
      this.velocity = velocity;

      this.radius = radius;
      this.color = color;
      this.opacity = 1;
      this.fades = fades;
    }

    draw() {
      c.save();
      c.globalAlpha = this.opacity;
      c.beginPath();
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
      c.restore();
    }

    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      if (this.fades) this.opacity -= 0.01;
    }
  }

  class Invader {
    constructor({ position }) {
      this.velocity = {
        x: 0,
        y: 0,
      };

      const image = new Image();
      image.src = "/images/spaceInvaders/invader.png";
      image.onload = () => {
        const scale = 1;
        this.image = image;
        this.width = image.width * scale;
        this.height = image.height * scale;
        this.position = {
          x: position.x,
          y: position.y,
        };
      };
    }

    draw() {
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }

    update({ velocity }) {
      if (this.image) {
        this.draw();
        this.position.x += velocity.x;
        this.position.y += velocity.y;
      }
    }

    shoot(InvaderProjectiles) {
      InvaderProjectiles.push(
        new InvaderProjectile({
          position: {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height,
          },
          velocity: {
            x: 0,
            y: 5,
          },
        })
      );
    }
  }

  class InvaderProjectile {
    constructor({ position, velocity }) {
      this.position = position;
      this.velocity = velocity;

      this.width = 3;
      this.height = 10;
    }

    draw() {
      c.fillStyle = "white";
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }

  class Grid {
    constructor() {
      this.position = {
        x: 0,
        y: 0,
      };
      this.velocity = {
        x: 3,
        y: 0,
      };
      this.invaders = [];

      const cols = Math.floor(Math.random() * 10 + 5); // 5 to 15
      const rows = Math.floor(Math.random() * 5 + 2); // 2 to 7

      this.width = cols * 30;

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          this.invaders.push(
            new Invader({
              position: {
                x: x * 30, // invader width
                y: y * 30, // invader height
              },
            })
          );
        }
      }
    }

    update() {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      this.velocity.y = 0;

      if (
        this.position.x + this.width >= canvas.width ||
        this.position.x <= 0
      ) {
        this.velocity.x = -this.velocity.x;
        this.velocity.y = 30;
      }
    }
  }

  // array
  const player = new Player();
  const projectiles = [];
  const grids = [];
  const invaderProjectiles = [];
  const particles = [];
  // keyboard
  const keys = {
    a: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
    ArrowLeft: {
      pressed: false,
    },
    ArrowRight: {
      pressed: false,
    },
    space: {
      pressed: false,
    },
  };

  // let
  let frames = 0; // spawn grids at intervals
  let randomInterval = Math.floor(Math.random() * 500 + 500);

  let lives = 3;

  // background particles
  for (let i = 0; i < 100; i++) {
    particles.push(
      new Particle({
        position: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        },
        velocity: {
          x: 0,
          y: 0.3,
        },
        radius: Math.random() * 2,
        color: "white",
      })
    );
  }

  // create particles
  function createParticles({ object, color, fades }) {
    for (let i = 0; i < 15; i++) {
      particles.push(
        new Particle({
          position: {
            x: object.position.x + object.width / 2,
            y: object.position.y + object.height / 2,
          },
          velocity: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
          },
          radius: Math.random() * 3,
          color: color || "#BAA0DE",
          fades,
        })
      );
    }
  }

  // player Animation
  function animate() {
    if (!game.active) return;

    requestAnimationFrame(animate); // image loop
    c.clearRect(0, 0, canvas.width, canvas.height);

    // player
    player.update();

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
        particle.update();
      }
    });
    // invader projectile
    invaderProjectiles.forEach((invaderProjectile, index) => {
      if (
        invaderProjectile.position.y + invaderProjectile.height >=
        canvas.height
      ) {
        setTimeout(() => {
          // garbage collection
          invaderProjectiles.splice(index, 1);
        }, 0);
      } else invaderProjectile.update();

      // collision detection, invader hits player
      if (
        invaderProjectile.position.y + invaderProjectile.height >=
          player.position.y &&
        invaderProjectile.position.x + invaderProjectile.width >=
          player.position.x &&
        invaderProjectile.position.x <= player.position.x + player.width
      ) {
        // player lose
        setTimeout(() => {
          invaderProjectiles.splice(index, 1); // garbage collection

          lives -= 1;

          if (lives <= 0) {
            game.over = true;
            player.opacity = 0;
            // game stop
            setTimeout(() => {
              game.active = false;
            }, 1000);
          } else {
            let flashes = 0;
            const flashInterval = setInterval(() => {
              player.opacity = player.opacity === 1 ? 0.2 : 1;
              flashes++;
              if (flashes > 10) {
                clearInterval(flashInterval);
                player.opacity = 1;
              }
            }, 100);
          }

          // projectile hits player
          createParticles({
            object: player,
            color: "white",
            fades: true,
          });
        }, 0);
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
        projectile.update();
      }
    });

    // invader
    grids.forEach((grid, gridIndex) => {
      grid.update();

      // spawning projectiles
      if (frames % 100 === 0 && grid.invaders.length > 0) {
        grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(
          invaderProjectiles
        );
      }

      grid.invaders.forEach((invader, i) => {
        invader.update({ velocity: grid.velocity });

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
                createParticles({
                  object: invader,
                  fades: true,
                });

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

  // Key Pressed
  addEventListener("keydown", ({ key }) => {
    if (game.over) return;

    switch (key) {
      case "a":
      case "ArrowLeft":
        keys.a.pressed = true;
        break;
      case "d":
      case "ArrowRight":
        keys.d.pressed = true;
        break;
      case " ":
        projectiles.push(
          new Projectile({
            position: {
              x: player.position.x + player.width / 2,
              y: player.position.y,
            },
            velocity: { x: 0, y: -10 },
          })
        );
        break;
    }
  });
  // Key Released
  addEventListener("keyup", ({ key }) => {
    switch (key) {
      case "a":
      case "ArrowLeft":
        keys.a.pressed = false;
        break;
      case "d":
      case "ArrowRight":
        player.velocity.x = +5;
        keys.d.pressed = false;
        break;
      case " ":
        break;
    }
  });
}
