

class Block extends Phaser.Sprite {
    constructor(game, x, y, asset) {
        super(game, x, y, asset)
        this.game.physics.arcade.enable(this)
        //this.anchor.setTo(0.3, 0.3)
        this.body.syncBounds = true
        this.body.immovable = true
        this.tag = 'wood'
        this.autoCull = true
        
    }
}

class Hole extends Phaser.Sprite {
    constructor(game, x, y, asset) {
       super(game, x, y, asset)
        this.game.physics.arcade.enable(this)
        this.anchor.setTo(0.5, 0.5) 
        this.body.setCircle(this.width-24);
        //this.body.syncBounds = true
        this.body.immovable = true
        this.tag = 'hole'
        this.autoCull = true
       
        //var anime = this.animations.add('spin', [0, 1, 2, 3, 4, 5], 5, true) //criar a animação com frames para estados dos sprites (0 a n)
        //this.animations.play('spin')
        
        
    }
}

class Enemie extends Phaser.Sprite {
    constructor(game, x, y, asset) {
       super(game, x, y, asset)
        this.game.physics.arcade.enable(this)
        this.anchor.set(0.5) 
        this.body.syncBounds = true
        this.body.immovable = true
        this.tag = 'droid'
        this.autoCull = true
       
        var anime = this.animations.add('spin', [0, 1, 2, 3], 5, true) //criar a animação com frames para estados dos sprites (0 a n)
        this.animations.play('spin')
        
        
    }
}
