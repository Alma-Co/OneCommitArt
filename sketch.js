let speed = 2;
let x, y = 150;
const totalTriangles = y*2;


function setup() {
  createCanvas(720, 700);
  stroke(4, 55, 242);
  frameRate(50);
}

function draw() {
  background(0);
  y = y - speed;
  if (y + 80 < -totalTriangles ||y + totalTriangles > width) {
    speed *= -1;
  }

  for (let i = 0; i < totalTriangles; i +=5) {
    fillEvenTriangle(i)
    triangle(y + i, y + i, y + i, 60, 60, 60 + y + i);
  }

  for (let i = 0; i < totalTriangles; i +=5) {
    fillEvenTriangle(i)
    triangle(30 + i, y + i, y + i, 80, 80, 80 + y + i);
  }
}

function fillEvenTriangle(item) {
  let black = color(0);
  if(item === totalTriangles - 5){
    fill(black);
  }
  else if(item === totalTriangles % 2 == 0){
    let h = random(0, 242);
    fill(4, 55, h);
  }
  else {
    fill(black);
  }
}