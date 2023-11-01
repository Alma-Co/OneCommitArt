const branchNumber = 30;
let branchStep = 0;
let branchOffset = 0;
const branchAngle = 50;
const branchLength = 60;
let colorOffset = 0;
let colorOffsetDirection = 1;

function setup() {
  createCanvas(1000, windowHeight);
  branchStep = height / branchNumber;
  branchOffset = branchStep / 2;

  angleMode(DEGREES);
}

function draw() {
  stroke(250);
  background(0);
  strokeWeight(2);

  line(width / 2, 0, width / 2, height);

  drawBranch(width / 2, 0, 0, height);

  colorMode(HSL);

  let color = 240 + colorOffset;
  color = color + map(noise(color), 0, 1, -1, 1) * 5;
  fill(color, 85, 53);
  drawDiamond(width/5, height/5);

  color = 120 + colorOffset;
  color = color + map(noise(color), 0, 1, -1, 1) * 5;
  fill(120 + colorOffset, 100, 50);
  drawDiamond(width/5, height/2);

  color = colorOffset;
  color = color + map(noise(color), 0, 1, -1, 1) * 5;
  fill(colorOffset, 100, 60);
  drawDiamond(width/5, height - 150);

  colorOffset += colorOffsetDirection;

  if (colorOffset >= 120 ||colorOffset <= 0) {
    colorOffsetDirection *= -1;
  }

  drawBlackAndWhiteStripes();
}

function drawBranch(x, y, angle, length) {
  for (let y = branchStep * 2; y < height - branchStep; y += branchStep) {
    const offsetY = y + map(noise(y), 0, 1, -1, 1) * branchOffset;

    const centerX = width / 2;
    const centerY = offsetY;

    const x1 = centerX + branchLength;
    const y1 = centerY;

    let x2 = centerX + (x1 - centerX) * cos(-branchAngle) - (y1 - centerY) * sin(-branchAngle);
    let y2 = centerY + (x1 - centerX) * sin(-branchAngle) + (y1 - centerY) * cos(-branchAngle);

    line(centerX, centerY, x2, y2);

    x2 = centerX + (x1 - centerX) * cos(-180 + branchAngle) - (y1 - centerY) * sin(-180 + branchAngle);
    y2 = centerY + (x1 - centerX) * sin(-180 + branchAngle) + (y1 - centerY) * cos(-180 + branchAngle);

    line(centerX, centerY, x2, y2);
  }
}

function drawDiamond(x, y) {
  stroke(0);
  beginShape();
  vertex(x, y + 30);
  vertex(x + 30, y);
  vertex(x, y - 30);
  vertex(x - 30, y);
  endShape(CLOSE);
}

function drawBlackAndWhiteStripes() {
  stroke(250);
  strokeWeight(40);

  const startPointX = width / 1.3; 

  for (let y = 0; y < height + 40; y += 60) {
    line(startPointX, y, width, y - 50);
  }

  stroke(0);
  strokeWeight(40);
  line(width / 1.33, 0, width / 1.33, height)
}