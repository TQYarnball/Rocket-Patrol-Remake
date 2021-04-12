const { Phaser } = require("../../lib/phaser");



class Menu extends Phaser.Scenes {
    constructor() {
        super("menuScene");
    }

    create() {
        this.add.text(20, 20, "Rocket Patrol Menu");
        this.scene.start("playScene");
    }
}