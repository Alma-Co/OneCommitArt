const backgroundSketch = (sketch) => {
  class Division {
    constructor(start, end, middle)  {
      this.division = [start, end];
      this.middle = middle;
    }
  }

  function easeInSine(x) {
    return x * x;
  }

  function createRectangles(sketch) {
    const cols = 22;
    const rows = 23;
  
    const rectWidth = sketch.width / cols;
    const rectHeight = sketch.height / rows;
  
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (i % 3 === 0 && j % 3 === 0) {
          sketch.fill(233, 78, 104);
        } else if (i % 2 == 0 && j % 2 == 0) {
          sketch.fill(83, 252, 247);
        } else {
          sketch.fill(17, 53, 53);
        }
  
        sketch.rect(rectWidth * i, rectHeight * j, rectWidth, rectHeight);
      }
    }
  }

  function drawRosette(sketch) {
    sketch.translate(sketch.width / 2, sketch.height / 2);
  
    sketch.ellipseMode(sketch.CENTER);
    sketch.noFill();
    sketch.stroke(233, 78, 104)
    sketch.strokeWeight(4);
  
    // Smallest circle
    sketch.circle(0, 0, 35);
  
    // Arcs around the smallest circle
    
    sketch.arc(0, -25, 35, 35, sketch.radians(140), sketch.radians(40), sketch.OPEN);
    sketch.arc(-25, 0, 35, 35, sketch.radians(50), sketch.radians(305), sketch.OPEN);
    sketch.arc(0, 25, 35, 35, sketch.radians(315), sketch.radians(215), sketch.OPEN);
    sketch.arc(25, 0, 35, 35, sketch.radians(225), sketch.radians(125), sketch.OPEN);
  
    // Circle around arcs
    sketch.circle(0, 0, 85);
  
    // Outer circle
  
    sketch.circle(0, 0, sketch.width);
  
    const radius = sketch.width / 2;
  
    const minAngle = 5.625; // Only resutls of 360 / 2 / 2 / 2......
    const threshold = sketch.radians(minAngle); 
  
    const maxSubdivisions = Math.floor((360 / minAngle) / 2);
    // The greater the step, the faster the triangles will grow
    const heightStep = 29;
    const maxHeight = maxSubdivisions * heightStep;
  
    // How far from the center the triangles will start
    const startOffset = radius / 3;
  
    // First division is the whole circle
    const divisions = [new Division(0, sketch.degrees(sketch.TWO_PI), 0)];
  
    sketch.strokeWeight(4);
    sketch.stroke(255);
  
    // While there are subdivisions to proces
    while(divisions.length) {
      // Take the last one from the list
      const divisionInstance = divisions.pop();
  
      // Get the start and end angle of the division
      const division = divisionInstance.division;
  
      // Calculate the angle of the division
      const divisionAngle = Math.abs(division[1] - division[0]);
  
      // If the angle is smaller than the threshold, skip it
      if (sketch.radians(divisionAngle) <= threshold) {
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
      const currHeightEased = easeInSine(sketch.map(heightStep * subdivisions, 0, maxHeight, 0, 1));
  
      // In the first level of subdivisions we don't want to take into account previous 
      // angles or subidivions, because there weren't
      if (subdivisions === 1) {
        // The first vertex is at the start of the division at a startOffset height
        let vertex1 = sketch.createVector(sketch.sin(sketch.radians(division[0])) * startOffset, sketch.cos(sketch.radians(division[0])) * startOffset);
  
        // The second vertex is at the bisector of the angle, at a startOffset plus a percentage (eased) of the maxHeight
        const vertex2 = sketch.createVector(sketch.sin(sketch.radians(middleAngle)) * (startOffset + maxHeight * currHeightEased), sketch.cos(sketch.radians(middleAngle)) * (startOffset + maxHeight * currHeightEased));
        
        // Draw the fisrt line
        sketch.line(vertex1.x, vertex1.y, vertex2.x, vertex2.y);
    
        // Rotate the first vertex the angle of the division to place it at the same point, but on the other edge of the division 
        vertex1 = sketch.createVector(sketch.sin(sketch.radians(division[1])) * startOffset, sketch.cos(sketch.radians(division[1])) * startOffset);
  
        // Draw the second line
        sketch.line(vertex1.x, vertex1.y, vertex2.x, vertex2.y);
      } else {
        // The previous height is used to determine where the current triangle should start
        const prevHeightEased = easeInSine(sketch.map(heightStep * Math.floor(subdivisions / 2), 0, maxHeight, 0, 1));
  
        // The previous middle angle is where the previous triangle has the highest point, so our
        // current triangle must start from there.
        let prevMiddleAngle = division[divisionInstance.middle];
  
        // As before, the fisrst vertex is on the middle angle of the previous subdivision (one of the edges of the current one), and at the same height as the previous triangle 
        let vertex1 = sketch.createVector(sketch.sin(sketch.radians(prevMiddleAngle)) * (startOffset + maxHeight * prevHeightEased), sketch.cos(sketch.radians(prevMiddleAngle)) * (startOffset + maxHeight * prevHeightEased));
        // The second vertex is the same as before, in the middle angle, the offset plus the amoutn (eased) of the maxHeight
        const vertex2 = sketch.createVector(sketch.sin(sketch.radians(middleAngle)) * (startOffset + maxHeight * currHeightEased), sketch.cos(sketch.radians(middleAngle)) * (startOffset + maxHeight * currHeightEased));
    
        // Draw the first line
        sketch.line(vertex1.x, vertex1.y, vertex2.x, vertex2.y);
  
        // The rotation angle has to go in the same direction as the arc previous middle angle -> middle angle, to rotate the vertex1 to the other edge of the division
        const rotationAngle = prevMiddleAngle < middleAngle ? -divisionAngle : divisionAngle;
  
        const cosAngle = sketch.cos(sketch.radians(rotationAngle));
        const sinAngle = sketch.sin(sketch.radians(rotationAngle));
  
        // Rotate the vertex1 to the other edge of the division
        vertex1 = sketch.createVector(
          (cosAngle * vertex1.x) - (sinAngle * vertex1.y), 
          (sinAngle * vertex1.x) + (cosAngle * vertex1.y)
        );
  
        // Draw the second line
        sketch.line(vertex1.x, vertex1.y, vertex2.x, vertex2.y);
      }
  
    }
  }

  sketch.setup = () => {
    sketch.createCanvas(700, sketch.windowHeight);
  
    sketch.background(17, 53, 53);
  
    sketch.drawingContext.filter = 'blur(6px)';
    createRectangles(sketch);
      
    sketch.drawingContext.filter = 'blur(1.5px)';
    drawRosette(sketch);
  };

  sketch.draw = () => {};
}

const foregroundSketch = (sketch) => {
  var points = [];
  var angle = 0;
  var speed = 0.05;
  var radius = 350;

  function drawEllipsis(sketch) {
    sketch.stroke(83, 252, 247);
    sketch.fill(83, 252, 247);
  
    for(const point of points) {
      const x = point.x;
      const y = point.y;
  
      sketch.ellipse(x, y, 8, 8);
    }
  }

  function calculatePoints(sketch) {
    if (angle < sketch.TWO_PI) {
      points.push({
        x: radius * sketch.cos(angle), 
        y: radius * sketch.sin(angle) 
      });
      angle = angle + speed;
    } else if (points.length) {
      points.shift();
    } else {
      angle = 0;
    }
  }

  sketch.setup = () => {
    sketch.createCanvas(700, sketch.windowHeight);
    sketch.frameRate(60);
  };

  sketch.draw = () => {
    sketch.translate(sketch.width / 2, sketch.height / 2);
    sketch.rotate(-sketch.HALF_PI);
    sketch.background(0, 0, 0, 0.3);
    calculatePoints(sketch);
    drawEllipsis(sketch);
  };
}

let backgroundP5 = new p5(backgroundSketch, document.getElementById('sketch-background'));
let foregroundP5 = new p5(foregroundSketch, document.getElementById('sketch-foreground'));