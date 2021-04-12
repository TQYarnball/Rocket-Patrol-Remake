const { Phaser } = require("../lib/phaser");

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scenes: [Menu],
}

let game = new Phaser.Game();