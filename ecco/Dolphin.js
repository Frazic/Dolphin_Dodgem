class Dolphin {
    constructor(x, y, speed_x, speed_y, size) {
        this.position = new p5.Vector(x, y);
        this.speed_x = speed_x;
        this.speed_y = speed_y;
        this.size = size;
        // this.diameter = size;
        // this.radius = this.diameter / 2;
        this.isInvulnerable = false;
        this.image = dolphinImage;
        this.image.resize(this.size, this.size);
        this.bubble = bubbleImage;
        this.bubble.resize(this.size * 1.5, this.size * 1.5);
    }

    display() {
        push();
        imageMode(CENTER);
        image(this.image, this.position.x, this.position.y);
        if (this.isInvulnerable) {
            image(this.bubble, this.position.x, this.position.y)
        }
        pop();
    }

    moveUp() {
        this.position.y -= this.speed_y;
    }

    moveDown() {
        this.position.y += this.speed_y;
    }

    moveLeft() {
        this.position.x -= this.speed_x;
    }

    moveRight() {
        this.position.x += this.speed_x;
    }

    // isColliding(obstacle) {
    //     let distance_x = abs(this.position.x - obstacle.position.x);
    //     let distance_y = abs(this.position.y - obstacle.position.y);

    //     if (distance_x > (obstacle.width / 2 + this.radius)
    //         || distance_y > (obstacle.height / 2 + this.radius)) {
    //             return false;
    //         }

    //     if (distance_x <= (obstacle.width / 2)
    //         || distance_y <= (obstacle.height / 2)) {
    //             return true;
    //         }

    //     let cornerDistanceSq = (distance_x - obstacle.width / 2) ^ 2 +
    //                         (distance_y - obstacle.height / 2) ^ 2;

    //     return (cornerDistanceSq <= (this.radius ^ 2));
    // }
}