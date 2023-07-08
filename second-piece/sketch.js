let numberOfPoints;
const waves = 5;
const waveCycles = 4;
const waveAmplitude = 50;
let white, pink;
const speed = 0.01;
let offset = 0;


function setup() {
  createCanvas(700, windowHeight);
  numberOfPoints = width;
  white = color(255);
  pink = color(233, 128, 233);
}

function draw() {
  createBackground();
  stroke(0);
  strokeWeight(1);

  const step = (height / waves);
  
  for (let i = 0; i < waves; i++) {
    fill(255, 255, 0);
    beginShape();
    for (let j = 0; j < numberOfPoints; j++) {
      const angle = map(j, random(20), numberOfPoints, 0, 2*PI);
      const y = sin(angle * waveCycles);
      vertex(j, (y * waveAmplitude) + (i * step) + waveAmplitude + random(10));
    }

    //moving wave
    for (let j = 0; j < numberOfPoints; j++) {
      const angle = map(j, random(5), numberOfPoints, 8, 2*PI) + offset;
      const y = sin(angle * waveCycles);
      vertex(j, (y * waveAmplitude) + (i * step) + waveAmplitude + random(5));
    }
    endShape();
  }

  offset += speed;

  // Reset to zero to avoid overflow of the variable
  if (offset >= HALF_PI) {
    offset = 0;
  }
  endShape();

  
}

function createBackground() {
  beginShape();
  stroke(255);
  strokeWeight(150);
  setGradient(0, 0, width, height, white, pink); // invertir pink y white y mirar el resultado
  ellipse(width/2, height/2, width, height); 
  createLines();
  endShape()
}

function createLines() {
  stroke(255);
  for (let i = 120; i < height; i += 40) {
    strokeWeight(5 + i/20);
    line(0, i, width, i)
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