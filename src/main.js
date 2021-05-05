//Riley Dix 4/17/21 -- took about 12 hours
//Points Breakdown: 
//Game artwork, UI, and sound has been changed for a pirate aesthetic (60 pts)
//Added mouse control (20 pts)
//Added time when ships are hit (20pts)
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