
class PlayState extends GameState {

    preload() {
        this.game.load.image('player', 'assets/ball.png')
        this.game.load.image('background', 'assets/screen-bg.png')
        this.game.load.image('panel', 'assets/panel.png')
        this.game.load.image('box', 'assets/element-w.png')
        this.game.load.spritesheet('hole', 'assets/hole.png', 265, 253)

        this.game.load.image('fullscreen-button', 'assets/fullscreen-button.png')

        this.game.load.tilemap('level1', 'assets/mapa1.json', null, Phaser.Tilemap.TILED_JSON)
        //this.game.load.tilemap('level2', 'assets/mapa2.json', null, Phaser.Tilemap.TILED_JSON)
    }

    create() {
        this.game.renderer.roundPixels = true
        //game.renderer.clearBeforeRender = false
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        
        //Painel
        let panel = this.game.add.tileSprite(0, 0, this.game.width, this.game.height/12, 'panel')
        panel.fixedToCamera = true
   
        //Fundo
        let background = this.game.add.tileSprite(0, this.game.height/12, this.game.width, this.game.height, 'background')
        background.fixedToCamera = true

        

        // Mapa do jogo
        this.createMap()
         
        // players
        this.player1 = this.game.add.sprite(this.game.width/5, this.game.height/4, 'player')
        this.player1.anchor.setTo(0.5, 0.5)
        this.player1.scale.setTo(0.015, 0.015)
        this.game.physics.enable(this.player1, Phaser.Physics.ARCADE)
        this.player1.body.setCircle(this.width/2);

        this.player1.body.collideWorldBounds = true
        this.player1.body.bounce.set(0.3, 0.3)
        //this.player1.body.maxVelocity = 50
        this.player1.body.drag.set(300)
        
        
        this.game.camera.follow(this.player1)
    
        // Controlar player
        window.addEventListener("deviceorientation",  this.handleOrientation.bind(this), true);
        
        // HUD
        this.text1 = this.createHealthText(this.game.width*5/9, 40, 'V9')
         
        // Pontuação
        this.textLevels = this.createHealthText(this.game.width*2/9, 40, 'LEVEL:1/3 ')
         
        // Tempo
        this.time = 0
        this.textTime = this.createHealthText(this.game.width*4/9, 40, 'TEMPO: '+this.time)
        this.game.time.events.loop(1000, this.updateTime, this);

        // adicionar controles de full screen a tela
        super.initFullScreenButtons()
    
        
    }

    //Level1
    createMap(){
        let mapTmx = this.game.add.tilemap('level1');
        this.game.world.setBounds(0, 0, mapTmx.widthInPixels, mapTmx.heightInPixels);

        this.map = this.game.add.group()
        this.holeMap = this.game.add.group()
        
        mapTmx.createFromObjects('Camada de Objetos 1', 2, 'box', 0, true, false, this.map, Block);
        mapTmx.createFromObjects('Camada de Objetos 1', 1, 'hole', 0, true, false, this.holeMap);     
        
        this.holeMap.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 5, true);
        this.holeMap.callAll('animations.play', 'animations', 'spin');    
    }

    //Level 2
    createMap2(){
        this.textLevels.destroy()
        //textTime.destroy()
        this.player1.destroy()
        this.holeMap.destroy()
        
        
        // Update Hud
        textLevels.text = 'LEVEL: 2/3'

           
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
        this.physics.arcade.collide(this.player1, this.holeMap, this.createMap2, null, this);
        
    }

    boxCollision() {
        if("vibrate" in window.navigator) {
            window.navigator.vibrate(100);
        }
    }

    updateTime(){
        this.time = this.time+1
        this.textTime.text = 'TEMPO: '+this.time 
        
    }

    
    render() {
       this.game.debug.body(this.player1)
    
    }
}

window.onload = function() {
    // funciona como singleton
    const GAME = new Game()
}