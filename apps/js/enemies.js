

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
        this.body.setCircle(this.width-22);
        //this.body.syncBounds = true
        this.body.immovable = true
        this.tag = 'hole'
        this.autoCull = true
        
    }
}

class Enemie extends Phaser.Sprite {
    constructor(game, x, y, asset) {
       super(game, x, y, asset)
        this.game.physics.arcade.enable(this)
        this.anchor.set(0.5) 
        this.body.syncBounds = true
        this.body.setCircle(this.width-22);
        
        this.body.immovable = true
        this.tag = 'droid'
        this.autoCull = true
       
        var anime = this.animations.add('spin', [0, 1, 2, 3], 5, true) //criar a animação com frames para estados dos sprites (0 a n)
        this.animations.play('spin')
    }
}

class Fire extends Phaser.Sprite {
    constructor(game, x, y, asset) {
       super(game, x, y, asset)
        this.game.physics.arcade.enable(this)
        this.anchor.set(0.5) 
        //this.body.syncBounds = true
        this.body.setCircle(this.width-13);
        
        this.body.immovable = true
        this.tag = 'fire'
        this.autoCull = true
       
        var anime = this.animations.add('spin', [0, 1, 2, 3], 6, true) //criar a animação com frames para estados dos sprites (0 a n)
        this.animations.play('spin')

    }
}

class Boss extends Phaser.Sprite {
    constructor(game, x, y, asset) {
       super(game, x, y, asset)
        this.game.physics.arcade.enable(this)
        this.anchor.set(0.5) 
        this.body.syncBounds = true
        this.body.setCircle(this.width/2);
        
        this.body.immovable = true
        this.tag = 'saw'
        this.autoCull = true
       
        this.game.add.tween(this)
            .to ( { alpha: 0.5 }, 500 )
            .to ( { alpha: 1.2 }, 500 )
            .loop(-1)
            .start()
        
        this.game.add.tween(this)
            .to ( { angle: -359 }, 2000 )
            .loop(-1)
            .start()
        
         this.game.add.tween(this)
            .to( {x: game.width-60, y: 60}, game.width/0.2 )
            .to( {x: this.x, y: this.y}, game.height/0.2 )
            //.to( {x: 50, y: 50}, game.height/0.2 )
            .loop(-1)
            .start()   
    }
}

class Star extends Phaser.Sprite {
    constructor(game, x, y, asset) {
       super(game, x, y, asset)
        this.game.physics.arcade.enable(this)
        this.anchor.setTo(0.5, 0.5) 
        this.body.setCircle(this.width/3);
        this.body.syncBounds = false
        this.body.immovable = true
        this.tag = 'star'
        this.autoCull = true
               
    }
}
