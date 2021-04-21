//Riley Dix 4/17/21 -- took about 12 hours
//Points Breakdown: 
//Game artwork, UI, and sound has been changed for a pirate aesthetic (60 pts)
//Planning to add mouse control, and a new speedy enemy ship (20 pts each)
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