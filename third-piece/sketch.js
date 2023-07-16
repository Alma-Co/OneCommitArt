function setup() {
    createCanvas(700, windowHeight);
}

function draw() {
      createRectangles()
      filter(BLUR, 10);
  }

  function createRectangles() {
    beginShape()
    noFill()
    for (let i = 0; i < width - 35; i += 35) {
      for (let j = 0; j < height - 35; j += 35) {
        if(i % 3 == 0 && j % 3 == 0) {
             fill(233, 78, 104)
        } else if (i % 2 == 0 && j % 2 == 0) {
            fill(83, 252, 247)
        } else {
            fill(17, 53, 53)
        }
        rect(0 + i, 0 + j, 40, 40)
      }
    }
    endShape()
  }