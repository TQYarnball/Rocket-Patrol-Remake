//const { Phaser } = require("../../lib/phaser");

class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.movementSpeed = 3;
    }

    update() {
        //movement
        this.x -= moveSpeed;
        //warp around
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }
    //reset() {
    //    this.x = game.config.width + 50;
    //    this.alpha = 1;
    //}
}
