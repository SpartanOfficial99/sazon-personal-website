// Set up the canvas for fireworks
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.id = 'fireworksCanvas';
const ctx = canvas.getContext('2d');

// Set canvas size to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables to hold the fireworks
let fireworks = [];
let particles = [];

// Firework constructor
function Firework(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = 3;
    this.exploded = false;
    this.velocity = { x: Math.random() * 6 - 3, y: Math.random() * -6 - 3 };
}

// Particle constructor (for explosion effect)
function Particle(x, y, color, velocity, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = velocity;
    this.size = size;
    this.life = 100; // Particle life time
}

// Update canvas size when window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Generate random color for fireworks
function randomColor() {
    const colors = ['#ff3366', '#ffcc00', '#33cc33', '#3399ff', '#ff33cc', '#ffff33'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Create a new firework
function createFirework() {
    const x = Math.random() * canvas.width;
    const y = canvas.height - 10;
    const color = randomColor();
    fireworks.push(new Firework(x, y, color));
}

// Create explosion particles
function createParticles(firework) {
    for (let i = 0; i < 100; i++) {
        const velocity = { x: Math.random() * 4 - 2, y: Math.random() * 4 - 2 };
        const particle = new Particle(firework.x, firework.y, firework.color, velocity, Math.random() * 3 + 2);
        particles.push(particle);
    }
}

// Update and draw fireworks and particles
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw fireworks
    for (let i = 0; i < fireworks.length; i++) {
        const firework = fireworks[i];
        if (!firework.exploded) {
            firework.x += firework.velocity.x;
            firework.y += firework.velocity.y;
            firework.velocity.y += 0.1; // gravity effect
            if (firework.y <= canvas.height / 2) {
                firework.exploded = true;
                createParticles(firework); // Explosion happens here
            }
        } else {
            // Draw the firework as a small circle before it explodes
            ctx.beginPath();
            ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
            ctx.fillStyle = firework.color;
            ctx.fill();
        }
    }

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        particle.size *= 0.98; // particles shrink over time
        particle.life -= 1;

        // Remove dead particles
        if (particle.life <= 0) {
            particles.splice(i, 1);
            i--;
        } else {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        }
    }

    requestAnimationFrame(update); // Keep the animation going
}

// Trigger fireworks every 1 second
setInterval(createFirework, 1000);

// Start the animation loop
update();

