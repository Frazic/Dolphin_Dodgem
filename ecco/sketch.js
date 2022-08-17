const invulnerabilityMillis = 2000;
const maxObstacleCount = 10;

let sizeMod;
let dolphinSize;
let canvasWidth;
let canvasHeight;
let dolphin;
let obstacles = [];
let gameSpeed;
let score = 0;
let lives = 3;
let isColliding = false;
let invulnerabilityStart
let isInvulnerable = false;

// TODO
// Everything depends on window size
// Sonar

function preload(){
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;

  // sizeMod = (canvasWidth + canvasHeight) / 2;
  sizeMod = min(canvasWidth, canvasHeight);

  dolphinImage = loadImage("img/dolphin_logo.png");
  bubbleImage = loadImage("img/bubble.png");

  // Obstacles
  seaweeds = [];
  stones = [];
  creatures = [];

  let minSize = 0.05;
  let maxSize = 0.15;

  for (let index = 1; index < 5; index++) {
    seaweeds.push([
      loadImage("img/obstacles/seaweed" + index + ".png"),
      int(random(sizeMod * minSize, sizeMod * maxSize))]);
  }

  for (let index = 1; index < 6; index++) {
    stones.push([
      loadImage("img/obstacles/stone" + index + ".png"),
      int(random(sizeMod * minSize, sizeMod * maxSize))]);
  }

  creatures.push([
    loadImage("img/obstacles/diver1.png"),
    int(random(sizeMod * minSize, sizeMod * maxSize))]);
  creatures.push([
    loadImage("img/obstacles/murloc1.png"),
    int(random(sizeMod * minSize, sizeMod * maxSize))]);
  creatures.push([
    loadImage("img/obstacles/orca1.png"),
    int(random(sizeMod * minSize, sizeMod * maxSize))]);
  creatures.push([
    loadImage("img/obstacles/shark1.png"),
    int(random(sizeMod * minSize, sizeMod * maxSize))]);
}

function setup() {
  gameSpeed = canvasWidth * 0.005;

  createCanvas(canvasWidth, canvasHeight);

  dolphinSize = sizeMod * 0.1 ;
  dolphin = new Dolphin(50, canvasHeight / 2, canvasWidth * 0.01, canvasHeight * 0.01, dolphinSize);

  while (obstacles.length < maxObstacleCount) {
    if (obstacles.length == 0) {
      obstacles.push(new Obstacle(canvasWidth, canvasHeight, gameSpeed));
    } else {
      obstacles.push(generateNewNonCollidingObstacle(obstacles));
    }
  }

  invulnerabilityStart = millis();
}

function draw() {
  background(72, 126, 176);

  let collision = false;

  for (let index = 0; index < obstacles.length; index++) {
    let obstacle = obstacles[index];

    collision = collision || objectsAreColliding(dolphin, obstacle);

    if (obstacle.position.x - obstacle.width / 2 < canvasWidth) {
      obstacle.display();
    }
    obstacle.scrollLeft();

    if (obstacle.position.x + obstacle.width / 2 <= 0) {
      obstacles[index] = generateNewNonCollidingObstacle(obstacles);
    }
  }

  isInvulnerable = (millis() - invulnerabilityStart < invulnerabilityMillis);
  if (isInvulnerable) {
    dolphin.isInvulnerable = true;
  } else {
    dolphin.isInvulnerable = false;
  }
  dolphin.display();

  checkMove();

  score += 1;
  if (score % 250 == 0) {
    gameSpeed = parseFloat((gameSpeed + 0.05).toFixed(2));
  }
  push();
  textSize(20);
  fill("white");
  stroke("black");
  strokeWeight(2);
  text("Score: " + round(score/10) + "\nLives: " + lives, 2, 15);
  pop();

  if (collision && !isInvulnerable) {
    if (!isColliding) {
      lives -= 1;
      isColliding = true;
      invulnerabilityStart = millis();
    }
  } else {
    isColliding = false;
  }

  lives < 0 ? gameOver() : null;
}

function checkMove() {
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    if (dolphin.position.y - dolphin.size / 2 > 0) {
      dolphin.moveUp();
    }
  } if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    if (dolphin.position.y + dolphin.size / 2 < canvasHeight) {
      dolphin.moveDown();
    }
  } if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    if (dolphin.position.x - dolphin.size / 2 > 0) {
      dolphin.moveLeft();
    }
  } if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    if (dolphin.position.x + dolphin.size / 2 < canvasWidth) {
      dolphin.moveRight();
    }
  }
}

function objectsAreColliding(object, obstacle, buffer=0) {
  let x1 = object.position.x - ((object.size + buffer) / 2);
  let x2 = object.position.x + ((object.size + buffer) / 2);
  let y1 = object.position.y - ((object.size + buffer) / 2);
  let y2 = object.position.y + ((object.size + buffer) / 2);

  let ox1 = obstacle.position.x - ((obstacle.width) / 2);
  let ox2 = obstacle.position.x + ((obstacle.width) / 2);
  let oy1 = obstacle.position.y - ((obstacle.height) / 2);
  let oy2 = obstacle.position.y + ((obstacle.height) / 2);

  return (x1 < ox2 && x2 > ox1) && (y1 < oy2 && y2 > oy1);
}

function generateNewNonCollidingObstacle(obstacleArray) {
  let areColliding = true;
  let newObstacle;
  while (areColliding) {
    newObstacle = new Obstacle(canvasWidth, canvasHeight, gameSpeed);
    areColliding = false;
    obstacleArray.forEach(obstacle => {
      areColliding = areColliding || objectsAreColliding(newObstacle, obstacle, 3 * dolphinSize);
    });
  }

  return newObstacle;
}

function gameOver() {
    noLoop();
    clear();
    background(72, 126, 176);

    push();
    textSize(int(sizeMod * 0.1));
    fill("white");
    stroke("black");
    strokeWeight(2);
    textAlign(CENTER, CENTER);
    text("WELL PLAYED!\nScore: " + round(score/10), canvasWidth / 2, canvasHeight / 2);
    pop();
}