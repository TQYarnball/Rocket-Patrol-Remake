//const { Phaser } = require("../lib/phaser");
//remove the above line if nothing specifically tells you to add it by the end of the tutorial.
let config = {
    type: Phaser.Auto,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//set up keyboard variable
let keyLEFT, keyRIGHT, keyF, keyR;