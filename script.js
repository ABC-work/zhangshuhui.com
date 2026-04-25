const canvas = document.querySelector("#field");
const ctx = canvas.getContext("2d");
const pointer = { x: 0, y: 0, active: false };
let particles = [];
let width = 0;
let height = 0;
let pixelRatio = 1;

function resize() {
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * pixelRatio);
  canvas.height = Math.floor(height * pixelRatio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const count = Math.min(88, Math.max(38, Math.floor(width / 18)));
  particles = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 1.6 + Math.random() * 3.8,
    vx: (Math.random() - 0.5) * 0.34,
    vy: (Math.random() - 0.5) * 0.34,
    hue: index % 4,
  }));
}

function colorFor(index, alpha) {
  const colors = [
    `rgba(111, 143, 114, ${alpha})`,
    `rgba(66, 106, 137, ${alpha})`,
    `rgba(198, 97, 74, ${alpha})`,
    `rgba(197, 155, 68, ${alpha})`,
  ];
  return colors[index];
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < -20) particle.x = width + 20;
    if (particle.x > width + 20) particle.x = -20;
    if (particle.y < -20) particle.y = height + 20;
    if (particle.y > height + 20) particle.y = -20;

    if (pointer.active) {
      const dx = pointer.x - particle.x;
      const dy = pointer.y - particle.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 150) {
        particle.x -= dx * 0.003;
        particle.y -= dy * 0.003;
      }
    }

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = colorFor(particle.hue, 0.28);
    ctx.fill();

    for (let next = index + 1; next < particles.length; next += 1) {
      const other = particles[next];
      const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
      if (distance < 128) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(23, 32, 27, ${0.09 * (1 - distance / 128)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(draw);
}

window.addEventListener("resize", resize);
window.addEventListener("pointermove", (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  pointer.active = true;
});
window.addEventListener("pointerleave", () => {
  pointer.active = false;
});

document.querySelector("#year").textContent = new Date().getFullYear();

const localTime = document.querySelector("#local-time");
function updateLocalTime() {
  localTime.textContent = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
  }).format(new Date());
}

updateLocalTime();
setInterval(updateLocalTime, 30000);
resize();
draw();
