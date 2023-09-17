const branchNumber = 30;
let branchStep = 0;
let branchOffset = 0;
const branchAngle = 50;
const branchLength = 60;

function setup() {
  createCanvas(700, windowHeight);
  branchStep = height / branchNumber;
  branchOffset = branchStep / 2;

  angleMode(DEGREES);
}

function draw() {
  stroke(0);
  strokeWeight(2);

  line(width / 2, 0, width / 2, height);

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

  noise(width / 2, )
}
