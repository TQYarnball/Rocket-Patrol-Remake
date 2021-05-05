//const { Phaser } = require("../../lib/phaser");

class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        //load  spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    
    create(){
        
        this.starfield = this.add.tileSprite(
            0,0,640,480, 'starfield'
        ).setOrigin(0,0);


        //add player rocket
        this.p1Rocket = new Rocket(
            this, 
            game.config.width/2, 
            game.config.height - borderUISize - borderPadding, 
            'rocket'
            ).setOrigin(0.5, 0);

        //add the enemy ships
        this.ship1 = new Ship(this, 
        game.config.width + borderUISize*6, 
        borderUISize*4, 
        'spaceship', 
        0, 
        30).setOrigin(0, 0);
        
        this.ship2 = new Ship(this, 
        game.config.width + borderUISize*3, 
        borderUISize*5 + borderPadding*2, 
        'spaceship', 
        0, 
        20).setOrigin(0,0);

        this.ship3 = new Ship(this, 
        game.config.width, 
        borderUISize*6 + borderPadding*4, 
        'spaceship', 
        0, 
        10).setOrigin(0,0);
        

        // green UI background
        this.add.rectangle(0, 
        borderUISize + borderPadding, 
        game.config.width, 
        borderUISize * 2, 
        0xFF0000).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 
        0, 
        game.config.width, 
        borderUISize, 
        0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 
        game.config.height - borderUISize, 
        game.config.width, 
        borderUISize, 
        0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 
        0, 
        borderUISize, 
        game.config.height, 
        0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 
        0, 
        borderUISize, 
        game.config.height, 
        0xFFFFFF).setOrigin(0, 0);
        
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
        //animation config
        this.anims.create({
            key: 'explode', 
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //score setup
        this.p1Score = 0;

        
        
        //score display
        this.scoreConfig = {
            fontFamily: 'Courier',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, 
            borderUISize + borderPadding*2, 
            "Score: " + this.p1Score, 
            this.scoreConfig);
            
        this.remainingTime = this.game.settings.gameTimer;
        this.displayTime = this.add.text(borderUISize + borderPadding, 
            borderUISize + borderPadding*2 + 20, 
            "Time: " + this.remainingTime, 
            this.scoreConfig);

        // GAME OVER flag
        this.gameOver = false;  

        // 60-second play clock
        this.scoreConfig.fixedWidth = 0;
        //this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        //    this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        //    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart, or <- for Menu', scoreConfig).setOrigin(0.5);
        //    this.gameOver = true;
        //}, null, this);

        //setting up time variable
        
    }

    update(time, delta) {
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        
        
        //counting down time
        if(!this.gameOver) {
            this.remainingTime -= delta;
        }
        this.displayTime.text = "Time: " + Math.round(this.remainingTime / 1000);
        console.log(this.remainingTime);

        this.starfield.tilePositionX -= 1;
        if (!this.gameOver) { 
            this.p1Rocket.update();
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
        }
    //    this.checkCollision(this.p1Rocket, this.Ship1);
    //    this.checkCollision(this.p1Rocket, this.Ship2);
    //    this.checkCollision(this.p1Rocket, this.Ship3);
    
        if(this.checkCollision(this.p1Rocket, this.ship3)) {
        //    ship.alpha = 0;
            this.p1Rocket.reset();
            this.shipExplode(this.ship3);
            this.remainingTime += 1000
        }
        if(this.checkCollision(this.p1Rocket, this.ship2)) {
        //   ship.alpha = 0;
            this.p1Rocket.reset();
            this.shipExplode(this.ship2);
            this.remainingTime += 1000
        }
        if(this.checkCollision(this.p1Rocket, this.ship1)) {
        //    ship.alpha = 0;
            this.p1Rocket.reset();
            this.shipExplode(this.ship1);
            this.remainingTime += 1000
        }

        this.checkGameOver();
    }

    // checkCollision(rocket, ship) {
    //     if(rocket.x > ship.x &&
    //         rocket.x < ship.x+ ship.width &&
    //         rocket.y + rocket.height > ship.y &&
    //         rocket.y < ship.y + ship.height) {
    //             return true;
    //         } else { 
    //             return false;
    //         }
    // }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        //score add
        this.p1Score += ship.points;
        this.scoreLeft.text = "Score: " + this.p1Score;
        this.sound.play('sfx_explosion');
    }


    checkGameOver(){
        if(this.remainingTime <= 0) {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart, or <- for Menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }
    }
}
