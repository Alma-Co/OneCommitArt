let y = 150;
const totalTriangles = y*2;

function setup() {
  createCanvas(720, 400);
  stroke(4, 55, 242);
  frameRate(30);
}

function draw() {
  background(0);
  y = y - 1;
  if (y < -totalTriangles) {
    y = height;
  }
  fill(0);
  for (let i = 0; i < totalTriangles; i +=5) {
    triangle(y + i, y + i, y + i, 60, 60, 60 + y + i);
  }
}
