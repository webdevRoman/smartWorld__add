const canvas = document.getElementById('app')
const ctx = canvas.getContext('2d')

let displayHeight = window.innerHeight
let displayWidth = window.innerWidth

canvas.height = displayHeight
canvas.width = displayWidth

class Bubble {
  constructor() {
    this.rad = Math.random() * 80 + 20
    this.startRad = this.rad
    this.x = Math.random() * (displayWidth - this.rad * 2) + this.rad
    this.y = Math.random() * (displayHeight - this.rad * 2) + this.rad
    this.color = `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 6) / 10 + 0.4})`
    this.dy = Math.round((Math.random() - 0.5) * 10);
    this.dx = Math.round((Math.random() - 0.5) * 10);
  }
  update() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

const bubblesNumber = 15
let bubbles = []
for (let i = 0; i < bubblesNumber; i++) {
  bubbles[i] = new Bubble()
  bubbles[i].update()
}

function animate() {
  if (displayWidth != window.innerWidth || displayHeight != window.displayHeight) {
    displayWidth = window.innerWidth;
    displayHeight = window.innerHeight;
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, displayWidth, displayHeight);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].y += bubbles[i].dy;
    bubbles[i].x += bubbles[i].dx;
    if (bubbles[i].x + bubbles[i].rad > displayWidth || bubbles[i].x - bubbles[i].rad < 0) {
      bubbles[i].dx = -bubbles[i].dx;
    }
    if (bubbles[i].y + bubbles[i].rad > displayHeight || bubbles[i].y - bubbles[i].rad < 0) {
      bubbles[i].dy = -bubbles[i].dy;
    }
    if (mousex > bubbles[i].x - bubbles[i].rad &&
      mousex < bubbles[i].x + bubbles[i].rad &&
      mousey > bubbles[i].y - bubbles[i].rad &&
      mousey < bubbles[i].y + bubbles[i].rad &&
      bubbles[i].rad < bubbles[i].startRad * 1.4) {
      bubbles[i].rad += 2
    } else if (bubbles[i].rad > bubbles[i].startRad) {
      bubbles[i].rad -= 2
    }
  }
}

let mousex = 0
let mousey = 0
addEventListener("mousemove", function() {
  mousex = event.clientX;
  mousey = event.clientY;
});

animate();