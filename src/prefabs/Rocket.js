//const { Phaser } = require("../../lib/phaser");

//const { Phaser } = require("../../lib/phaser");

class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 3;
        this.isFiring = false;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        if(!this.isFiring){
            // if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
            //     this.x -= this.moveSpeed;
            // } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
            //     this.x += this.moveSpeed;
            // }
            this.x = game.input.mousePointer.x;
        }

        //fire button
        if(game.input.activePointer.leftButtonDown() && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play(); //pew
        }
        //if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }    
        //reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }

}