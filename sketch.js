let speed = 2;
let x, y;
const totalTriangles = 300;
const splitFactor = 10;


function setup() {
  createCanvas(720, 700);
  stroke(4, 55, 242);
  frameRate(50);
  x = y = 420;
}

function draw() {
  background(0);
  y = y - speed;
  if (y + 80 < -totalTriangles || y + totalTriangles > width) {
    speed *= -1;
  }

  const yPercentage = -1 * ((y - (width - totalTriangles)) / (width + 80));

  console.log(y ,yPercentage);

  for (let i = 0; i < totalTriangles; i +=5) {
    fillEvenTriangle(i);
    triangle(y + i * (splitFactor * yPercentage), y + i * (splitFactor * yPercentage), y + i * (splitFactor * yPercentage), 60, 60, 60 + y + i * (splitFactor * yPercentage));
  }

  for (let i = 0; i < totalTriangles; i +=5) {
    triangle(30 + i * (splitFactor * yPercentage), y + i * (splitFactor * yPercentage), y + i * (splitFactor * yPercentage), 80, 80, 80 + y + i * (splitFactor * yPercentage));
  }

  
}

const DARK_MAGENTA= [302, 90, 56];
const PERSIAN_BLUE = [233, 75, 69];
const SAPPHIRE = [223, 70, 66];
const BLUE_MUNSELL = [190, 59, 59];
const MINT = [151, 60, 73];
const SCREAMIN_GREEN = [131, 64, 93];

function fillEvenTriangle(item) {
  let black = color(0);
  if(item === totalTriangles - 5){
    fill(black);
  }
  else if(item === totalTriangles % 2 == 0){
    fill(color(random(DARK_MAGENTA), random(PERSIAN_BLUE), random(SAPPHIRE), random(BLUE_MUNSELL), random(MINT), random(SCREAMIN_GREEN)));
  }
  else {
    fill(black);
  }
}