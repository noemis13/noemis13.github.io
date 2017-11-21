
class PlayState extends GameState {

    preload() {
        this.game.load.image('player', 'assets/ball.png')
        this.game.load.image('background', 'assets/fundoMadeira.jpg')
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
        this.player1.scale.setTo(0.02, 0.02)
        this.game.physics.enable(this.player1, Phaser.Physics.ARCADE)
        this.player1.body.collideWorldBounds = true
        this.player1.body.bounce.set(0.8)
    
        // Controlar player
        
        window.addEventListener("deviceorientation",  this.handleOrientation.bind(this), true);
        
        

        /*if(gyro.getFeatures().length != 0) {     
            gyro.frequency = 10;     
            gyro.startTracking(function(o) {     
                this.player1.body.velocity.x += o.gamma;     
                this.player1.body.velocity.y += o.beta;     });
        }*/

        // HUD
        this.text1 = this.createHealthText(this.game.width*1/9, 50, 'PLAYER A: 5')
        
        // adicionar controles de full screen a tela
        super.initFullScreenButtons()
    }


    createHealthText(x, y, string) {
        let style = {font: 'bold 16px Arial', fill: 'white'}
        let text = this.game.add.text(x, y, string, style)
        text.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 2)
        text.anchor.setTo(0.5, 0.5)
        return text
    }

    update() { 
        // Mover player
    }

    handleOrientation(e) {
        var z = e.alpha;
        var y = e.beta;
        var x = e.gamma;
        this.player1.body.velocity.x -= x*2;
        this.player1.body.velocity.y -= y*2;
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