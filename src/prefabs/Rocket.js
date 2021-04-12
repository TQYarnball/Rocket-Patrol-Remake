//const { Phaser } = require("../../lib/phaser");

//const { Phaser } = require("../../lib/phaser");

class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 3;
        this.isFiring = false;
    }

    update() {
        if(this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.movementSpeed;
            } else if (keyRight.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.movementSpeed;
            }
        }

        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyF)) {
            this.isFiring = true;
        }
        //if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.movementSpeed;
        }    
        //reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }
    //reset() {
    //    this.y = game.config.height-borderUISize-borderPadding;
    //    this.isFiring = false;
    //}

}