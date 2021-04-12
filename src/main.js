const { Phaser } = require("../lib/phaser");
//remove the above line if nothing specifically tells you to add it by the end of the tutorial.
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game();

let borderUISize = gmae.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLeft, keyRight, keyF, keyR;