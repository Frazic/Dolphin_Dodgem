class Obstacle {
    constructor(canvasWidth, canvasHeight, speed) {
        this.size = random(10, 40);
        this.width = this.size;
        this.height = this.width * 2;
        this.position = new p5.Vector(  canvasWidth + random(50, 2 * canvasWidth),
                                        random(this.height / 2, canvasHeight - this.height / 2));
        this.speed = speed;
        this.obstacleTypes = ["seaweed", "stone", "creature"];
        this.obstacleImage = this.determineObstacleImage();
    }

    display() {
        push();
        stroke(50);
        fill(50);
        imageMode(CENTER);
        image(this.obstacleImage, this.position.x, this.position.y);
        pop();
    }

    scrollLeft() {
        this.position.x -= this.speed;
    }

    determineObstacleImage() {
        let obstacle;
        let obstacleSize;
        let obstacleImage;
        switch (random(this.obstacleTypes)) {
            case "seaweed":
                obstacle = random(seaweeds);
                obstacleImage = obstacle[0];
                obstacleSize = obstacle[1];
                obstacleImage.resize(obstacleSize, obstacleSize * 2);
                break;
            case "stone":
                obstacle = random(stones);
                obstacleImage = obstacle[0];
                obstacleSize = obstacle[1];
                obstacleImage.resize(obstacleSize, obstacleSize * 2);
                break;
            default:
                obstacle = random(creatures);
                obstacleImage = obstacle[0];
                obstacleSize = obstacle[1];
                obstacleImage.resize(obstacleSize * 2, obstacleSize);
                break;
                // rectMode(CENTER);
                // rect(this.position.x, this.position.y, this.width, this.height);
                // break;
        }

        return obstacleImage;
    }
}