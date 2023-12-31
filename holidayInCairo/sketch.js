let numberOfPoints;
const waves = 5;
const waveCycles = 4;
const waveAmplitude = 50;
let lighterPink, pink;
const speed = 0.03;
let offset = 0;


function setup() {
  createCanvas(700, windowHeight);
  numberOfPoints = width;
  lighterPink = color(233, 128, 10);
  pink = color(233, 128, 233);
}

function draw() {
  createBackground();

  drawPyramid(80);

  stroke(0);
  strokeWeight(1);

  const step = (height / waves);
  
  fill(255, 255, 0);

  for (let i = 0; i < waves - 1; i++) {
    drawWave(numberOfPoints, waveCycles, waveAmplitude, 20, 10, (i * step) + step / 1.5, 0, true, false);
    drawWave(numberOfPoints, 1, waveAmplitude, 5, 5, (i * step) + step / 1.5, offset + (i * .5), false, true);
  }

  offset += speed;

  // Reset to zero to avoid overflow of the variable
  if (offset >= TWO_PI) {
    offset = 0;
  }

  createFrame()
}

function createFrame() {
  beginShape()
  noFill()
  for (let i = 0; i < width/10; i += 5) {
    // strokeWeight(8);
    // stroke(188, 64, 50 + i*4);
    if(i % 2 == 0) {
      strokeWeight(9);
      stroke(188, 64, 50 + i*5);
    } else {
      strokeWeight(3);
      stroke(0);
    }
    rect(0 + i , 0 + i, width - i*2, height -i*2, 20)
  }
    
  endShape()
}
function drawWave(numberOfPoints, cycles, amplitude, angleDistorsion, amplitudeDistorsion, heightOffset, movingOffset, startShape = true, closeShape = true) {
  if (startShape) {
    beginShape();
  }

  for (let j = width/10 - 10; j < numberOfPoints - width / 10 + 10; j++) {
    const angle = map(j - (width/10 - 10), random(angleDistorsion), numberOfPoints - width / 10 + 10, TWO_PI, 0) + movingOffset;
    const y = sin(angle * cycles);
    vertex(j, (y * amplitude) + heightOffset + amplitude + random(amplitudeDistorsion));
  }

  if (closeShape) {
    endShape();
  }
}

function drawPyramid(extensionFactor = 0) {
  stroke(255);
  strokeWeight(10);

  line(-extensionFactor, height, width/2, width / 10);
  line(width + extensionFactor, height, width/2, width / 10);
}

function createBackground() {
  stroke(0);
  strokeWeight(150);
  setGradient(0, 0, width, height, lighterPink, pink);
  ellipse(width/2, height/2, width, height); 
  createLines();
}

function createLines() {
  stroke(0);
  for (let i = 250; i < height; i += 20) {
    strokeWeight(3 + i/40);
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