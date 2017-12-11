
class PlayState extends GameState {

    preload() {
        this.game.load.image('player', 'assets/ball2.png')
        this.game.load.image('background', 'assets/screen-bg.png')
        this.game.load.image('panel', 'assets/panel.png')
        this.game.load.image('box', 'assets/element-w.png')
        this.game.load.image('hole', 'assets/hole.png')
       
        this.game.load.image('fullscreen-button', 'assets/fullscreen-button.png')

        this.game.load.tilemap('level1', 'assets/map1.json', null, Phaser.Tilemap.TILED_JSON)
        this.game.load.tilemap('level2', 'assets/map2.json', null, Phaser.Tilemap.TILED_JSON)
        this.game.load.tilemap('level3', 'assets/map3.json', null, Phaser.Tilemap.TILED_JSON)
        
    }

    create() {
        this.game.renderer.roundPixels = true
        //this.game.renderer.clearBeforeRender = false
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
        this.player1 = this.game.add.sprite(this.game.width/2, this.game.height-40, 'player')
        this.player1.anchor.setTo(0.5, 0.5)
        this.game.physics.enable(this.player1, Phaser.Physics.ARCADE)
        this.player1.body.setCircle(this.width/2);

        this.player1.body.collideWorldBounds = true
        this.player1.body.bounce.set(0.3, 0.3)
        //this.player1.body.maxVelocity = 50
        this.player1.body.drag.set(300)
        this.game.camera.follow(this.player1)
    
        // Controlar player
        window.addEventListener("deviceorientation",  this.handleOrientation.bind(this), true);

        // Controlar no PC
        this.keys1 = {
            upKey: this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
            downKey: this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            leftKey: this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            rightKey: this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
        }    


        // adicionar controles de full screen a tela
        super.initFullScreenButtons()
        
        this.createHud()
    }

    createHud(){
        // HUD
        this.textVersion = this.createHealthText(this.game.width*7/9, 25, 'N8')
        this.textVersion.fixedToCamera = true
        
       // Pontuação
       this.textLevels = this.createHealthText(this.game.width*2/9, 25, 'LEVEL:1/3 ')
       this.textLevels.fixedToCamera = true
        
       // Tempo
       this.time = 0
       this.textTime = this.createHealthText(this.game.width*5/9, 25, 'TEMPO: '+this.time)
       this.textTime.fixedToCamera = true
       this.game.time.events.loop(1000, this.updateTime, this);
    }

    
    createMap(){
        let mapTmx = this.game.add.tilemap('level1');
        this.game.world.setBounds(0, 0, mapTmx.widthInPixels, mapTmx.heightInPixels);

        this.map = this.game.add.group()
        this.holeMap = this.game.add.group()
        
        mapTmx.createFromObjects('Camada de Objetos 1', 2, 'box', 0, true, false, this.map, Block);
        mapTmx.createFromObjects('Camada de Objetos 1', 1, 'hole', 0, true, false, this.holeMap, Hole);     
        
        this.numberOfLevel = 1;
    }

    createMap2(){
        this.totalTimer += this.time;
		this.time = 0;
		this.numberOfLevel++;
		this.textTime.setText("Tempo: "+this.timer);
		//this.totalTimeText.setText("Total time: "+this.totalTimer);
		this.textLevels.setText("Level:2/3 ");
		this.player1.body.x = this.game.width/2;
		this.player1.body.y = this.game.height-40;
		this.player1.body.velocity.x = 0;
        this.player1.body.velocity.y = 0;
        
        this.map.destroy()
        this.holeMap.destroy()
        
        
        // Mapa level 2
        let mapTmx = this.game.add.tilemap('level2');
        this.game.world.setBounds(0, 0, mapTmx.widthInPixels, mapTmx.heightInPixels);
        
        this.map = this.game.add.group()
        this.holeMap = this.game.add.group()
        
        mapTmx.createFromObjects('Camada de Objetos 1', 2, 'box', 0, true, false, this.map, Block);
        mapTmx.createFromObjects('Camada de Objetos 1', 1, 'hole', 0, true, false, this.holeMap, Hole);     
        
    }
    
    
    createMap3(){
        this.totalTimer += this.time;
		this.time = 0;
		this.numberOfLevel++;
		this.textTime.setText("Tempo: "+this.timer);
		//this.totalTimeText.setText("Total time: "+this.totalTimer);
		this.textLevels.setText("Level:2/3 ");
		this.player1.body.x = this.game.width/2;
		this.player1.body.y = this.game.height-40;
		this.player1.body.velocity.x = 0;
        this.player1.body.velocity.y = 0;
        
        this.map.destroy()
        this.holeMap.destroy()
        
        
        // Mapa level 3
        let mapTmx = this.game.add.tilemap('level3');
        this.game.world.setBounds(0, 0, mapTmx.widthInPixels, mapTmx.heightInPixels);
        
        this.map = this.game.add.group()
        this.holeMap = this.game.add.group()
        
        mapTmx.createFromObjects('Camada de Objetos 1', 2, 'box', 0, true, false, this.map, Block);
        mapTmx.createFromObjects('Camada de Objetos 1', 1, 'hole', 0, true, false, this.holeMap, Hole);     
        
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
        //text.scale.setTo(0.8, 0.8)
        return text
    }

    update() { 
        //Controle

        if (this.keys1.leftKey.isDown) {
            this.player1.body.velocity.x -= 10;
        } else
        if (this.keys1.rightKey.isDown) {
            this.player1.body.velocity.x += 10;
        }

        if (this.keys1.upKey.isDown) {
            this.player1.body.velocity.y -= 10;
        } else 
        if (this.keys1.downKey.isDown) {
            this.player1.body.velocity.y += 10;
        }

        // Colisão
        this.physics.arcade.collide(this.player1, this.map, this.boxCollision, null, this);
        this.physics.arcade.collide(this.player1, this.holeMap, this.finishLevel, null, this);
        //this.physics.arcade.collide(this.player1, this.holeMap, this.boxCollision, null, this);
        
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

    finishLevel(){       
        alert('Parabéns, fase completa!! !\nTempo total de jogo: '+this.time+' segundos!');
        if(this.numberOfLevel == 1){
            this.createMap2()
        
        } else if(this.numberOfLevel == 2){
            this.createMap3()
        }
	
    }


    render() {
       this.game.debug.body(this.player1)
       
    }
}

window.onload = function() {
    // funciona como singleton
    const GAME = new Game()
}