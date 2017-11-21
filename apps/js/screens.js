
class PlayState extends GameState {
    preload() {
        this.game.load.image('player', 'assets/car.png')
        this.game.load.image('background', 'assets/roadBackground2.jpg')
        this.game.load.image('shot', 'assets/shot.png')
        this.game.load.image('saw', 'assets/saw.png')
        this.game.load.spritesheet('explosion', 'assets/explosion.png', 56, 56)
        this.game.load.image('fullscreen-button', 'assets/fullscreen-button.png')
    }

    create() {
        this.game.renderer.roundPixels = true
        //game.renderer.clearBeforeRender = false
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        
        let background = this.game.add.sprite(0, 0,  'background')
        background.scale.x = this.game.width/background.width
        background.scale.y = this.game.height/background.height
       //let background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background')
      //  background.autoScroll(-30, 0)

        // players
        //this.player1 = new Player(this.game, this.game.width/1.5, this.game.height-140, 'player')    
        //this.game.add.existing(this.player1)
       
        this.player1 = this.game.add.sprite(this.game.width/1.5, this.game.height-140, 'player')
        this.player1.anchor.setTo(0.5, 0.5)
        this.player1.scale.setTo(2, 2)
        this.game.physics.enable(this.player1, Phaser.Physics.ARCADE)
        this.player1.body.collideWorldBounds = true
        this.player1.body.bounce.set(0.8)

        
        // Biblioteca Gyro
        if(Phaser.Device.iOS) {	
            //this.player1.body.velocity.x = -(document.body.getAttribute("beta") * 10);
            this.player1.body.velocity.x = -(document.body.getAttribute("beta")*10)
        } else {	
            //this.player1.body.velocity.x = document.body.getAttribute("beta") * 10;
            this.player1.body.velocity.x = document.body.getAttribute("beta")*10
        }

        // mapa com paredes
       // this.createMap()

        // HUD
        this.text1 = this.createHealthText(this.game.width*1/9, 50, 'PLAYER A: 5')
        
        // adicionar controles de full screen a tela
        super.initFullScreenButtons()
    }

    createExplosion(x, y) {
        let explosion = game.add.sprite(x, y, 'explosion')
        let anim = explosion.animations.add('full', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] , 60, false)
        explosion.scale.setTo(0.5, 0.5)
        explosion.anchor.setTo(0.5, 0.5)   
        explosion.animations.add('four', [4] , 20, true)    
        explosion.animations.play('full')
        anim.onComplete.add( () => explosion.kill() )
    }

    createHealthText(x, y, string) {
        let style = {font: 'bold 16px Arial', fill: 'white'}
        let text = this.game.add.text(x, y, string, style)
        text.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 2)
        text.anchor.setTo(0.5, 0.5)
        return text
    }

    createMap() {
        let mapData = [ "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                        "X                              X",
                        "X                              X",
                        "X                              X",
                        "X                              X",
                        "X                              X",
                        "X          XXXXXXXXXXX         X",
                        "X          X         X         X",
                        "X                              X",
                        "X                              X",
                        "X                              X",
                        "X                              X",
                        "X          X         X         X",
                        "X          XXXXXXXXXXX         X",
                        "X                              X",
                        "X                              X",
                        "X                              X",
                        "X                              X",
                        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"]
                        
        this.map = this.game.add.group()
        for (let row = 0; row < mapData.length; row++) {
            for (let col = 0; col < mapData[0].length; col++) {
                if (mapData[row][col] == 'X') {
                    let block = this.map.create(col*32, row*32, 'wall')
                    block.scale.setTo(0.5, 0.5)
                    this.game.physics.arcade.enable(block)
                    block.body.immovable = true
                    block.tag = 'wall'
                    block.inputEnabled = true
                    block.input.enableDrag(false, true)        
                }
            }
        }
    }

    update() { 
        // colisoes
        // this.game.physics.arcade.collide(player1, bullets2, hitPlayer)
        
    }

    updateHud() {
        this.text1.text = 'PLAYER A: ' + this.player1.health
    }

    render() {
    //    game.debug.body(npc)
    //    game.debug.body(player1)
    //    game.debug.body(player2)
    }
}

window.onload = function() {
    // funciona como singleton
    const GAME = new Game()
}