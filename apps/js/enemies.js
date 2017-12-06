
class Saw extends Phaser.Sprite {
    constructor(game, x, y, asset) {
        super(game, x, y, asset)   
        this.anchor.setTo(0.5, 0.5)
        this.inputEnabled = true
        this.input.enableDrag(false, true)        

        this.game.add.tween(this)
            .to ( { alpha: 0.5 }, 500 )
            .to ( { alpha: 1.2 }, 500 )
            .loop(-1)
            .start()

        this.game.add.tween(this)
            .to ( { angle: -359 }, 2000 )
            .loop(-1)
            .start()
        
    }

    update() {
        // logica do npc
    }
}

class Block extends Phaser.TileSprite {
    constructor(game, x, y, asset) {
        super(game, x, y, 100, 20, asset)
        this.game.physics.arcade.enable(this)
        this.body.syncBounds = true
        this.body.immovable = true
        this.tag = 'wood'
        this.autoCull = true
    }
}

class Hole extends Phaser.Sprite {
    constructor(game, x, y, asset) {
        super(game, x, y, 100, 20, asset)
        this.game.physics.arcade.enable(this)
//        this.animations.add('full', [0, 1, 2, 3, 4, 5], 40, true) //criar a animação com frames para estados dos sprites (0 a n)

        this.body.syncBounds = true
        this.body.immovable = true
        this.tag = 'hole'
        this.autoCull = true
  //      this.animations.play('full')
        
    }
}