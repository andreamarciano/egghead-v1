export class Player {
  constructor(canvas) {
    this.velocity = { x: 0, y: 0 };
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

  draw(c) {
    c.save();
    c.globalAlpha = this.opacity;

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

  update(c) {
    if (this.image) {
      this.draw(c);
      this.position.x += this.velocity.x;
    }
  }
}

export class Projectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 4;
  }

  draw(c) {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "red";
    c.fill();
    c.closePath();
  }

  update(c) {
    this.draw(c);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

export class Invader {
  constructor({ position }) {
    this.velocity = { x: 0, y: 0 };

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

  draw(c) {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update({ velocity, c }) {
    if (this.image) {
      this.draw(c);
      this.position.x += velocity.x;
      this.position.y += velocity.y;
    }
  }

  shoot(invaderProjectiles, InvaderProjectileClass) {
    invaderProjectiles.push(
      new InvaderProjectileClass({
        position: {
          x: this.position.x + this.width / 2,
          y: this.position.y + this.height,
        },
        velocity: { x: 0, y: 5 },
      })
    );
  }
}

export class InvaderProjectileClass {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 3;
    this.height = 10;
  }

  draw(c) {
    c.fillStyle = "white";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(c) {
    this.draw(c);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

export class Grid {
  constructor() {
    this.position = { x: 0, y: 0 };
    this.velocity = { x: 3, y: 0 };
    this.invaders = [];

    const cols = Math.floor(Math.random() * 10 + 5); // 5 to 15
    const rows = Math.floor(Math.random() * 5 + 2); // 2 to 7

    this.width = cols * 30;

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        this.invaders.push(
          new Invader({
            position: { x: x * 30, y: y * 30 },
          })
        );
      }
    }
  }

  update(canvas) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.y = 0;

    const hitRight = this.position.x + this.width >= canvas.width;
    const hitLeft = this.position.x <= 0;

    if (hitRight || hitLeft) {
      this.velocity.x *= -1;
      this.velocity.y = 30;
    }
  }
}

export class Particle {
  constructor({ position, velocity, radius, color, fades }) {
    this.position = position;
    this.velocity = velocity;

    this.radius = radius;
    this.color = color;
    this.opacity = 1;
    this.fades = fades;
  }

  draw(c) {
    c.save();
    c.globalAlpha = this.opacity;
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }

  update(c) {
    this.draw(c);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.fades) this.opacity -= 0.01;
  }
}

// create particles
export function createParticles(
  { object, color = "#BAA0DE", fades },
  particles
) {
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
        color,
        fades,
      })
    );
  }
}

// background particles
export function backgroundParticles(particles, canvas) {
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
}

export function setupKeyboard({ player, projectiles, Projectile }) {
  // keyboard
  const keys = {
    a: { pressed: false },
    d: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
    space: { pressed: false },
  };

  // Key Pressed
  addEventListener("keydown", ({ key }) => {
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

  return keys;
}
