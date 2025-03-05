// https://editor.p5js.org/n55iwi271003/sketches/aZ--WMF_B

let balls = [];  // array to store the ball objects
var palette = ["#fab515", "#d7312e", "#2a71af", "#ad7347", "#ad7347", "#1d1d1b"];
let envelope, oscillator;

function setup() {
  let sizeVal = min(windowWidth, windowHeight);
  createCanvas(sizeVal, sizeVal);
  noStroke();
  
  // set up tone envelope and oscillator
  envelope = new p5.Env();
  envelope.setADSR(0.01, 0.1, 0.1, 0.1);
  oscillator = new p5.Oscillator();
  oscillator.amp(envelope);
  oscillator.start();

  // create initial 10 ball objects
  for (let i = 0; i < 10; i++) {
    let chosenCol = int(random(0, palette.length));
    let ball = {
      x: random(width),
      y: random(height),
      vx: random(-5, 5),
      vy: random(-5, 5),
      size: random(sizeVal / 10, sizeVal / 5),
      color: color(palette[chosenCol])
    };
    balls.push(ball);
  }
}

function draw() {
  background("#f9f0de");

  // update and draw each ball
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    
    // update ball position
    ball.x += ball.vx;
    ball.y += ball.vy;
    
    // bounce off the walls
    if (ball.x > width || ball.x < 0) {
      playNote();
      let chosenCol = int(random(0, palette.length));
      ball.color = palette[chosenCol];
      ball.vx *= -1;
    }
    if (ball.y > height || ball.y < 0) {
      playNote();
      let chosenCol = int(random(0, palette.length));
      ball.color = palette[chosenCol];
      ball.vy *= -1;
    }
    
    // bounce off other balls
    for (let j = 0; j < balls.length; j++) {
      if (i !== j) {
        let other = balls[j];
        let d = dist(ball.x, ball.y, other.x, other.y);
        if (d < ball.size / 2 + other.size / 2) {
          ball.vx *= -1;
          ball.vy *= -1;
          other.vx *= -1;
          other.vy *= -1;
        }
      }
    }
    
    // draw the ball
    fill(ball.color);
    ellipse(ball.x, ball.y, ball.size, ball.size);
  }
}

function playNote() {
  oscillator.freq(mouseX*5);
  envelope.play();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    // add a new ball
    let sizeVal = min(windowWidth, windowHeight);
    let chosenCol = int(random(0, palette.length));
    let ball = {
      x: random(width),
      y: random(height),
      vx: random(-5, 5),
      vy: random(-5, 5),
      size: random(sizeVal / 10, sizeVal / 5),
      color: color(palette[chosenCol])
    };
    balls.push(ball);
  } else if (keyCode === DOWN_ARROW) {
    // remove a ball if there is one
    if (balls.length > 0) {
      balls.pop();
    }
  }
}
