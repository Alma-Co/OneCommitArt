let numberOfPoints;
const waves = 5;
const waveCycles = 4;
const waveAmplitude = 50;
let white, pink;


function setup() {
  createCanvas(700, windowHeight);
  numberOfPoints = width;
  white = color(255);
  pink = color(233, 128, 233);
}

function draw() {
  // background(250, 217, 250);
  setGradient(0, 0, width, height, pink, white);

  stroke(0);

  const step = (height / waves);
  
  for (let i = 0; i < waves; i++) {
    beginShape();
 
    for (let j = 0; j < numberOfPoints; j++) {
      fill(255, 255, 0);
      const angle = map(j, random(20), numberOfPoints, 0, 2*PI);
      const y = sin(angle * waveCycles);
      vertex(j, (y * waveAmplitude) + (i * step) + waveAmplitude + random(10));
    }
    for (let j = 0; j < numberOfPoints; j++) {
      const angle = map(j, random(5), numberOfPoints, 8, 2*PI);
      const y = sin(angle * waveCycles);
      vertex(j, (y * waveAmplitude) + (i * step) + waveAmplitude + random(5));
    }
    endShape();
  }
}

function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}