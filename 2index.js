let rings = [];
let numRings = 40;
let maxRadius; 
let currentRing = 0;
let hasStarted = false;
const MAX_HEIGHT = 600;

function setup() {
  const h = min(windowHeight, MAX_HEIGHT);
  let cnv = createCanvas(windowWidth, h);
  cnv.parent("sketch-holder");
  angleMode(DEGREES);
  noiseDetail(2, 0.5);
  noFill();
  maxRadius = min(width, height) * 0.3;
  frameRate(12);
  noLoop();

  const startButton = document.getElementById("startButton");
  if (startButton) {
    startButton.addEventListener("click", () => {
      if (!hasStarted) {
        hasStarted = true;
        currentRing = 0;
        rings = [];
        loop();
      }
    });
  } else {
    console.warn("Start button not found.");
  }
}

function draw() {
  if (!hasStarted) return;

  background("#f5f0e1");
  translate(width / 2, height / 2);

  if (currentRing < numRings) {
    rings.push(new Ring(currentRing));
    currentRing++;
  }

  for (let ring of rings) {
    ring.display();
  }


  if (currentRing >= numRings) {
    noLoop();

  }
}

class Ring {
  constructor(index) {
    this.index = index;
    this.points = [];
    this.radius = map(index, 0, numRings, 10, maxRadius);
    this.noiseScale = map(index, 0, numRings, 0.5, 1.5);
    this.roughness = map(index, 0, numRings, 5, 15);
    this.generate();
  }

  generate() {
    for (let angle = 0; angle < 360; angle += 5) {
      let rad = this.radius;
      let offset = map(noise(this.index * 0.3, angle * this.noiseScale * 0.03), 0, 2, -this.roughness, this.roughness);
      let r = rad + offset;
      let x = r * cos(angle);
      let y = r * sin(angle);
      this.points.push(createVector(x, y));
    }
  }

  display() {
    stroke(50, 30, 20, 100);
    strokeWeight(2);
    beginShape();
    for (let pt of this.points) {
      vertex(pt.y, pt.x);
    }
    endShape(CLOSE);
  }
}

function windowResized() {
  const h = min(windowHeight, MAX_HEIGHT);
  resizeCanvas(windowWidth, h);
  maxRadius = min(width, height) * 0.45;
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
