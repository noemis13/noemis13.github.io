

class Block extends Phaser.Sprite {
    constructor(game, x, y, asset) {
        super(game, x, y, asset)
        this.game.physics.arcade.enable(this)
        this.body.syncBounds = true
        this.body.immovable = true
        this.tag = 'wood'
        this.autoCull = true
    }
}

class Hole extends Phaser.Sprite {
    constructor(game, x, y, asset) {
       super(game, x, y, 0, 20, asset)
        this.game.physics.arcade.enable(this)
        this.body.syncBounds = true
        this.body.immovable = true
        this.tag = 'hole'
        this.autoCull = true
       
        
        
    }
}
