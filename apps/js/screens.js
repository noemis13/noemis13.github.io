
class PlayState extends GameState {

    preload() {
        this.game.load.image('player', 'assets/ball.png')
        this.game.load.image('background', 'assets/screen-bg.png')
        this.game.load.image('box', 'assets/box1.png')
        this.game.load.spritesheet('hole', 'assets/hole.png', 265, 253)

        this.game.load.image('fullscreen-button', 'assets/fullscreen-button.png')

        this.game.load.tilemap('level1', 'assets/mapa.json', null, Phaser.Tilemap.TILED_JSON)
    }

    create() {
        this.game.renderer.roundPixels = true
        //game.renderer.clearBeforeRender = false
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        
        let background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background')
        background.fixedToCamera = true

       //let background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background')
      //  background.autoScroll(-30, 0)


        // Mapa do jogo
        this.createMap()
         
        // players
        this.player1 = this.game.add.sprite(this.game.width/1.5, this.game.height-140, 'player')
        this.player1.anchor.setTo(0.5, 0.5)
        this.player1.scale.setTo(0.02, 0.02)
        this.game.physics.enable(this.player1, Phaser.Physics.ARCADE)
        this.player1.body.setCircle(this.width/2);

        this.player1.body.collideWorldBounds = true
        this.player1.body.bounce.set(0.3, 0.3)
        this.player1.body.maxVelocity = 50
        this.player1.body.drag.set(300)
        
        
        this.game.camera.follow(this.player1)
    
        // Controlar player
        window.addEventListener("deviceorientation",  this.handleOrientation.bind(this), true);
        
        // HUD
        this.text1 = this.createHealthText(this.game.width*3/9, 70, 'V2')
         
        // Pontuação
        this.score = 0
        this.textPoints = this.createHealthText(this.game.width*3/9, 50, 'PONTOS: '+this.score)
         
        
        // adicionar controles de full screen a tela
        super.initFullScreenButtons()
    
        
    }

    createMap(){
        let mapTmx = this.game.add.tilemap('level1');
        this.game.world.setBounds(0, 0, mapTmx.widthInPixels, mapTmx.heightInPixels);

        this.map = this.game.add.group()
        this.holeMap = this.game.add.group()
        
        mapTmx.createFromObjects('Object Layer 1', 1, 'box', 0, true, false, this.map, Block);
        mapTmx.createFromObjects('Object Layer 1', 2, 'hole', 0, true, false, this.holeMap);     
        
        this.holeMap.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 5, true);
        this.holeMap.callAll('animations.play', 'animations', 'spin');
          
    
    }


    handleOrientation(e) {
        var y = e.beta;
        var x = e.gamma;
        this.player1.body.velocity.x += x;
        this.player1.body.velocity.y += y;
    }

    createHealthText(x, y, string) {
        let style = {font: 'bold 16px Arial', fill: 'white'}
        let text = this.game.add.text(x, y, string, style)
        text.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 2)
        text.anchor.setTo(0.5, 0.5)
        return text
    }

    update() { 
        // Colisão
        this.physics.arcade.collide(this.player1, this.map, this.boxCollision, null, this);
        
    }

    boxCollision() {
        if("vibrate" in window.navigator) {
            window.navigator.vibrate(100);
        }
    }

    updateHud() {
        this.text1.text = 'PLAYER A: ' + this.player1.health
    }

    render() {
    //    game.debug.body(npc)
        this.game.debug.body(this.player1)
    //    game.debug.body(player2)

    }
}

window.onload = function() {
    // funciona como singleton
    const GAME = new Game()
}