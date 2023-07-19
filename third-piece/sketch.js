class Division {
  constructor(start, end, middle)  {
    this.division = [start, end];
    this.middle = middle;
  }
}

function setup() {
  createCanvas(700, windowHeight);
  
  background(17, 53, 53);

  drawingContext.filter = 'blur(7px)';
  createRectangles();
    
  drawingContext.filter = 'blur(2.5px)';
  drawRosette();
}


function easeInSine(x) {
  return x * x;
}

function draw() { }

function drawRosette() {
  translate(width / 2, height / 2);

  ellipseMode(CENTER);
  noFill();
  strokeWeight(3);

  // Smallest circle
  circle(0, 0, 35);

  // Arcs around the smallest circle
  arc(0, -25, 35, 35, radians(140), radians(40), OPEN);
  arc(-25, 0, 35, 35, radians(50), radians(305), OPEN);
  arc(0, 25, 35, 35, radians(315), radians(215), OPEN);
  arc(25, 0, 35, 35, radians(225), radians(125), OPEN);

  // Circle around arcs
  circle(0, 0, 85);

  // Outer circle
  circle(0, 0, width);

  const radius = width / 2;

  const minAngle = 5.625; // Only resutls of 360 / 2 / 2 / 2......
  const threshold = radians(minAngle); 

  const maxSubdivisions = Math.floor((360 / minAngle) / 2);
  // The greater the step, the faster the triangles will grow
  const heightStep = 29;
  const maxHeight = maxSubdivisions * heightStep;

  // How far from the center the triangles will start
  const startOffset = radius / 3;

  // First division is the whole circle
  const divisions = [new Division(0, degrees(TWO_PI), 0)];

  strokeWeight(2);
  stroke(0);

  // While there are subdivisions to proces
  while(divisions.length) {
    // Take the last one from the list
    const divisionInstance = divisions.pop();

    // Get the start and end angle of the division
    const division = divisionInstance.division;

    // Calculate the angle of the division
    const divisionAngle = Math.abs(division[1] - division[0]);

    // If the angle is smaller than the threshold, skip it
    if (radians(divisionAngle) <= threshold) {
      continue;
    }

    // Calculate the middle angle of the division. This angle will originate
    // two new divisions
    const middleAngle = division[0] + divisionAngle / 2;

    // Store the new divisions referencing which of the edges was the middle angle
    // of the current division. This will be used later to calculate the rotation
    divisions.push(
      new Division(division[0], middleAngle, 1),
      new Division(middleAngle, division[1], 0)
    )

    // Draw guiding lines
    // strokeWeight(1);
    // stroke(80);
    // line(0, 0, sin(radians(middleAngle)) * radius, cos(radians(middleAngle)) * radius);

    // Calculate how many subdivisions have been done to reach this division
    const subdivisions = Math.floor((360 / divisionAngle) / 2);

    // In the first iteration we just want to divide the whole circle, not draw anything
    if (subdivisions === 0) {
      continue;
    }

    // Calculate the height of the current triangles but with an easing function
    const currHeightEased = easeInSine(map(heightStep * subdivisions, 0, maxHeight, 0, 1));

    // In the first level of subdivisions we don't want to take into account previous 
    // angles or subidivions, because there weren't
    if (subdivisions === 1) {
      // The first vertex is at the start of the division at a startOffset height
      let vertex1 = createVector(sin(radians(division[0])) * startOffset, cos(radians(division[0])) * startOffset);

      // The second vertex is at the bisector of the angle, at a startOffset plus a percentage (eased) of the maxHeight
      const vertex2 = createVector(sin(radians(middleAngle)) * (startOffset + maxHeight * currHeightEased), cos(radians(middleAngle)) * (startOffset + maxHeight * currHeightEased));
      
      // Draw the fisrt line
      line(vertex1.x, vertex1.y, vertex2.x, vertex2.y);
  
      // Rotate the first vertex the angle of the division to place it at the same point, but on the other edge of the division 
      vertex1 = createVector(sin(radians(division[1])) * startOffset, cos(radians(division[1])) * startOffset);

      // Draw the second line
      line(vertex1.x, vertex1.y, vertex2.x, vertex2.y);
    } else {
      // The previous height is used to determine where the current triangle should start
      const prevHeightEased = easeInSine(map(heightStep * Math.floor(subdivisions / 2), 0, maxHeight, 0, 1));

      // The previous middle angle is where the previous triangle has the highest point, so our
      // current triangle must start from there.
      let prevMiddleAngle = division[divisionInstance.middle];

      // As before, the fisrst vertex is on the middle angle of the previous subdivision (one of the edges of the current one), and at the same height as the previous triangle 
      let vertex1 = createVector(sin(radians(prevMiddleAngle)) * (startOffset + maxHeight * prevHeightEased), cos(radians(prevMiddleAngle)) * (startOffset + maxHeight * prevHeightEased));
      // The second vertex is the same as before, in the middle angle, the offset plus the amoutn (eased) of the maxHeight
      const vertex2 = createVector(sin(radians(middleAngle)) * (startOffset + maxHeight * currHeightEased), cos(radians(middleAngle)) * (startOffset + maxHeight * currHeightEased));
  
      // Draw the first line
      line(vertex1.x, vertex1.y, vertex2.x, vertex2.y);

      // The rotation angle has to go in the same direction as the arc previous middle angle -> middle angle, to rotate the vertex1 to the other edge of the division
      const rotationAngle = prevMiddleAngle < middleAngle ? -divisionAngle : divisionAngle;

      const cosAngle = cos(radians(rotationAngle));
      const sinAngle = sin(radians(rotationAngle));

      // Rotate the vertex1 to the other edge of the division
      vertex1 = createVector(
        (cosAngle * vertex1.x) - (sinAngle * vertex1.y), 
        (sinAngle * vertex1.x) + (cosAngle * vertex1.y)
      );

      // Draw the second line
      line(vertex1.x, vertex1.y, vertex2.x, vertex2.y);
    }

  }
}

function createRectangles() {
  strokeWeight(1);

  const cols = 22;
  const rows = 23;

  const rectWidth = width / cols;
  const rectHeight = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (i % 3 === 0 && j % 3 === 0) {
        fill(233, 78, 104);
      } else if (i % 2 == 0 && j % 2 == 0) {
        fill(83, 252, 247);
      } else {
        fill(17, 53, 53);
      }

      rect(rectWidth * i, rectHeight * j, rectWidth, rectHeight);
    }
  }
}