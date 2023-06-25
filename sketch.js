let y = 150;

function setup() {
  createCanvas(720, 400);
  stroke(4, 55, 242);
  frameRate(30);
}

function draw() {
  background(0);
  y = y - 1;
  if (y < 0) {
    y = height;
  }
  fill(0);
  triangle(y , y, y, 60, 60, 60 + y);
}
