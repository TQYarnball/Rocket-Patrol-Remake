const { Phaser } = require("../lib/phaser");

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scenes: [Menu],
}

let game = new Phaser.Game();

let borderUISize = gmae.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLeft, keyRight, keyF, keyR;