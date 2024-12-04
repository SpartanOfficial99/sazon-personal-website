const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor(x, y, color, radius) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.speed = Math.random() * 2 + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.01;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= this.decay;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class FireworkExplosion {
    constructor(x, y, colors, particles) {
        this.x = x;
        this.y = y;
        this.colors = colors;
        this.particles = [];

        for (let i = 0; i < particles; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            this.particles.push(new Firework(x, y, color, Math.random() * 3 + 1));
        }
    }

    update() {
        this.particles.forEach((particle, index) => {
            particle.update();
            if (particle.alpha <= 0) this.particles.splice(index, 1);
        });
    }

    draw() {
        this.particles.forEach((particle) => particle.draw());
    }

    isDone() {
        return this.particles.length === 0;
    }
}

const fireworks = [];
const colors = ["#ff4b5c", "#ffcc00", "#4cffd7", "#4b79ff", "#ff6e6c"];

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;
    const explosion = new FireworkExplosion(x, y, colors, Math.random() * 50 + 50);
    fireworks.push(explosion);
}

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.isDone()) fireworks.splice(index, 1);
    });

    if (Math.random() < 0.05) createFirework();

    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
