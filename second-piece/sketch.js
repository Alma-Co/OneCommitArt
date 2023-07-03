let numberOfPoints;
const waveCycles = 4;
const waveAmplitude = 50;

function setup() {
  createCanvas(700, windowHeight);
  numberOfPoints = width;
}

function draw() {
  background(255);

  stroke(0);

  beginShape();
  for (let i = 0; i < numberOfPoints; i++) {
    const angle = map(i, 0, numberOfPoints, 0, 2*PI);

    const y = sin(angle * waveCycles);

    vertex(i, (y * waveAmplitude) + (height / 2));
  }
  endShape();
}
