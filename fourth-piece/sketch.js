const branchNumber = 30;
let branchStep = 0;
let branchOffset = 0;
const branchAngle = 50;
const branchLength = 60;
let colorOffset = 0;
let colorOffsetDirection = 1;

let BG_COLOR = 0;
let STROKE_COLOR = 250;
let pointOnX;
let fontsize = 80;

function setup() {
  createCanvas(1000, windowHeight);
  branchStep = height / branchNumber;
  branchOffset = branchStep / 2;
  pointOnX = width/5;
  textSize(fontsize);

  angleMode(DEGREES);

  setTimeout(() => { thunder(); }, random(1000, 5000));
}

function coloredLetters(textPos) {
  if(pointOnX > textPos && pointOnX < textPos + 40){
    fill('red')
    } else {
      fill(0)
    }
}


function draw() {
  stroke(STROKE_COLOR);
  background(BG_COLOR);
  strokeWeight(2);

  line(width / 2, 0, width / 2, height);

  drawBranch(width / 2, 0, 0, height);

  colorMode(HSL);

  textAlign(LEFT);
  const posY = height -50;
  
  let positionX = 20;
  ['S', 'c', 'a', 'n'].forEach((letter, index) => {
    positionX += 45;
    const y = 80;
    coloredLetters(positionX);
    text(letter, positionX, y);
  });
  let positionX2 = 20;
  ['y', 'o', 'u', 'r'].forEach((letter, index) => {
    positionX2 += 40;
    const y = height - 50;
    coloredLetters(positionX2);
    text(letter, positionX2, y);
  });
  let positionX3 = 220;
  ['l', 'i', 'f', 'e'].forEach((letter, index) => {
    positionX3 += 18;
    const y = height - 50;
    coloredLetters(positionX3);
    text(letter, positionX3, y);
  });

  movingDiamonds();


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
  stroke(STROKE_COLOR);
  strokeWeight(40);

  const startPointX = width / 1.3; 

  for (let y = 0; y < height + 40; y += 60) {
    line(startPointX, y, width, y - 50);
  }

  stroke(BG_COLOR);
  strokeWeight(40);
  line(width / 1.33, 0, width / 1.33, height)
}

function movingDiamonds(){
  let pointOnYtop = height/3;
  let pointOnYbottom = height - 250;
  line(pointOnX, 0, pointOnX, pointOnYtop)
  line(pointOnX, pointOnYbottom, pointOnX, height)

  let color = 240 + colorOffset;
  color = color + map(noise(color), 0, 1, -1, 1) * 5;
  fill(color, 204, 50);
  drawDiamond(pointOnX, pointOnYtop);

  color = colorOffset;
  color = color + map(noise(color), 0, 1, -1, 1) * 5;
  fill(colorOffset, 204, 50);
  drawDiamond(pointOnX, pointOnYbottom);
  pointOnX = pointOnX + 2;
  if (pointOnX > width - 290) {
    pointOnX = 0;
  }


  colorOffset += colorOffsetDirection;

  if (colorOffset >= 120 ||colorOffset <= 0) {
    colorOffsetDirection *= -1;
  }
}
  


function invertColors() {
  const aux = BG_COLOR;
  BG_COLOR = STROKE_COLOR;
  STROKE_COLOR = aux;
}

function thunder() {
  const thunderNum = random(1, 5);
  const noiseX = random(1000);
  const noiseLambda = 100;

  let totalTime = 0;

  for (let i = 0; i < thunderNum; i++) {
    const thunderSpacing = 150 + noise(noiseX + i * noiseLambda) * 150;
    const thunderDuration = 80 + noise(noiseX + i * noiseLambda) * 120;

    setTimeout(invertColors, i * thunderSpacing);
    setTimeout(invertColors, i * thunderSpacing + thunderDuration);

    // We just need the last, that's why we use = instead of +=
    totalTime = i * thunderSpacing + thunderDuration;
  }

  const nextThunder = 1000 + noise(noiseX + thunderNum * noiseLambda) * 4000;

  setTimeout(thunder, totalTime + nextThunder);
}