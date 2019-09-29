// canvas setup
let canvas = document.getElementsByTagName('canvas')[0];
canvas.width = window.innerWidth - 25;
canvas.height = window.innerHeight - 25;
let ctx = canvas.getContext('2d');

// object to store cursor coords
let mouse = {
  x: undefined,
  y: undefined,
}

// track cursor coords and store'em
window.addEventListener('mousemove', function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

// handle window resizing
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth - 25;
  canvas.height = window.innerHeight - 25;
})

// circle object
function Circle(x, y, dx, dy, radius, color) {
  this.x = x;                 // x coord
  this.y = y;                 // y coord
  this.dx = dx;               // speed on x axis
  this.dy = dy;               // speed on y axis
  this.radius = radius;       // circle radius
  this.color = color;         // -.-
  this.minRadius = radius;    // original size after resizing event
  this.maxRadius = radius * 3;  // maximum resize

  // draw shape
  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // handle animation
  this.update = function () {
    // handle bouncing from the edges
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    // increment coords [velocity]
    this.x += this.dx;
    this.y += this.dy;

    // resize on hover
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50
      && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < this.maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}

// array of circles
let circles = [];

// create circles
for (let i = 0; i < 500; i++) {

  let radius = (Math.random() + .2) * 10;
  let x = Math.random() * (canvas.width - radius * 2) + radius;
  let y = Math.random() * (canvas.height - radius * 2) + radius;
  let dx = 3 * (Math.random() - .5);
  let dy = 3 * (Math.random() - .5);
  let color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;

  circles.push(new Circle(x, y, dx, dy, radius, color));
}

// animate it
function animate() {
  // loop
  requestAnimationFrame(animate);

  // clears whole canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // run update for every circle
  circles.forEach((circle) => {
    circle.update();
  })
}

animate();