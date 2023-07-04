let numberOfPoints;
const waves = 5;
const waveCycles = 4;
const waveAmplitude = 50;

function setup() {
  createCanvas(700, windowHeight);
  numberOfPoints = width;
}

function draw() {
  background(255);

  stroke(0);

  const step = (height / waves);
  
  for (let i = 0; i < waves; i++) {
    beginShape();
    for (let j = 0; j < numberOfPoints; j++) {
      const angle = map(j, random(20), numberOfPoints, 0, 2*PI);

      const y = sin(angle * waveCycles);

      vertex(j, (y * waveAmplitude) + (i * step) + waveAmplitude + random(10));
    }
    endShape();
  }
}
