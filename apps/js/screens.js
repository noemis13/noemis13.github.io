
class PlayState extends GameState {

    preload() {
        this.game.load.image('player', 'assets/ball2.png')
        this.game.load.image('background', 'assets/screen-bg.png')
        this.game.load.image('panel', 'assets/panel.png')
        this.game.load.image('box', 'assets/element-w.png')
        this.game.load.image('boxVertical', 'assets/element-w2.png')
        this.game.load.image('hole', 'assets/hole.png')     
        this.game.load.image('fullscreen-button', 'assets/fullscreen-button.png')
        this.game.load.image('pause', 'assets/button-pause.png')
        this.game.load.image('boss', 'assets/saw.png')
        this.game.load.image('star', 'assets/star.png')
        
        this.game.load.spritesheet('droid', 'assets/droid.png', 32, 32)
        this.game.load.spritesheet('fire', 'assets/fire.png', 26, 32)
        this.load.spritesheet('audioOff', 'assets/button-audio.png', 35, 35);
		
        this.load.audio('audioHit', 'assets/bounce.mp3')
        this.load.audio('audioLevelUp', 'assets/smb_stage_clear.wav')
        this.load.audio('audioFinalLevel', 'assets/smb3_fortress_clear.wav')
        this.load.audio('audioDie', 'assets/smb_mariodie.wav')
        this.load.audio('audioLevel1', 'assets/level32.ogg')
        
        this.game.load.tilemap('level1', 'assets/map1.json', null, Phaser.Tilemap.TILED_JSON)
        this.game.load.tilemap('level2', 'assets/map2.json', null, Phaser.Tilemap.TILED_JSON)
        this.game.load.tilemap('level3', 'assets/map3.json', null, Phaser.Tilemap.TILED_JSON)
        this.game.load.tilemap('level4', 'assets/map4.json', null, Phaser.Tilemap.TILED_JSON)
        this.game.load.tilemap('level5', 'assets/map5.json', null, Phaser.Tilemap.TILED_JSON)
     
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

        // Botão audio
        this.audioStatus = true;
        this.audioButton = this.add.button(this.game.width-50, 2, 'audioOff', this.manageAudio, this);
        this.audioButton.anchor.set(1,0);
		this.audioButton.input.useHandCursor = true;
		this.audioButton.animations.add('true', [0], 10, true);
		this.audioButton.animations.add('false', [1], 10, true);
		this.audioButton.animations.play(this.audioStatus);
		this.audioButton.fixedToCamera = true

		
        // Botão de pausa
        this.pauseButton = this.add.button(this.game.width-8, 2, 'pause', this.managePause, this);
		this.pauseButton.anchor.set(1,0);
		this.pauseButton.input.useHandCursor = true;
        this.pauseButton.fixedToCamera = true
        
        //adicionar audio
        this.hitSound = this.game.add.audio('audioHit');
        this.audioLevel = this.game.add.audio('audioLevelUp');        
        this.audioFinal = this.game.add.audio('audioFinalLevel');        
        this.audioDie = this.game.add.audio('audioDie')
        this.audioLevel1 = this.game.add.audio('audioLevel1')
        
        // Mapa do jogo
        this.createMap()
         
        // player
        this.ball = this.game.add.sprite(this.game.width/2, this.game.height-40, 'player')
        this.ball.anchor.set(0.5);        
        this.game.physics.enable(this.ball, Phaser.Physics.ARCADE)
        this.ball.body.setCircle(this.ball.width/2);
        this.ball.body.collideWorldBounds = true
        this.ball.body.bounce.set(0.3, 0.3)
        //this.ball.body.maxVelocity = 50
        this.ball.body.drag.set(150)
        this.game.camera.follow(this.ball)
    
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

    manageAudio() {
		this.audioStatus =! this.audioStatus;
		this.audioButton.animations.play(this.audioStatus);
    }
    
    managePause() {
        this.fontMessage = { font: "24px Arial", fill: "#e4beef",  align: "center", stroke: "#320C3E", strokeThickness: 4 };
		
		this.game.paused = true;
		var pausedText = this.add.text(this.game.width*0.5, 250, "PAUSED GAME!\ntouch to continuous!", this.fontMessage);
		pausedText.anchor.set(0.5);
		this.input.onDown.add(function(){
			pausedText.destroy();
			this.game.paused = false;
		}, this);
	}
	

    createHud(){
        
       // Pontuação
       this.textLevels = this.createHealthText(this.game.width*2/9, 25, 'LEVEL:1/5 ')
       this.textLevels.fixedToCamera = true
        
       // Tempo
       this.time = 0
       this.textTime = this.createHealthText(this.game.width*5/9, 25, 'TIME: '+this.time)
       this.textTime.fixedToCamera = true
       this.game.time.events.loop(1000, this.updateTime, this);

    }

    
    createMap(){
        
        let mapTmx = this.game.add.tilemap('level1');
        this.game.world.setBounds(0, 0, mapTmx.widthInPixels, mapTmx.heightInPixels);

        this.map = this.game.add.group()
        this.holeMap = this.game.add.group()
        this.enemieMap = this.game.add.group()
        this.itemMap = this.game.add.group()

        mapTmx.createFromObjects('Camada de Objetos 1', 2, 'box', 0, true, false, this.map, Block);
        mapTmx.createFromObjects('Camada de Objetos 1', 3, 'boxVertical', 0, true, false, this.map, Block);
        mapTmx.createFromObjects('Camada de Objetos 1', 13, 'star', 0, true, false, this.itemMap, Star);
        mapTmx.createFromObjects('Camada de Objetos 1', 1, 'hole', 0, true, false, this.holeMap, Hole);     
        
        this.numberOfLevel = 1;
    }

    createMap2(){
        this.time = 0;
		this.numberOfLevel++;
		this.textTime.setText("TEMPO: "+this.time);
		this.textLevels.setText("Level:2/5 ");
		this.ball.body.x = this.game.width/2;
		this.ball.body.y = this.game.height-40;
		this.ball.body.velocity.x = 0;
        this.ball.body.velocity.y = 0;
        
        this.map.destroy()
        this.holeMap.destroy()
        this.itemMap.destroy()        
        
        // Mapa level 2
        let mapTmx = this.game.add.tilemap('level2');
        this.game.world.setBounds(0, 0, mapTmx.widthInPixels, mapTmx.heightInPixels);
        
        this.map = this.game.add.group()
        this.holeMap = this.game.add.group()
        this.enemieMap = this.game.add.group()
        this.itemMap = this.game.add.group()
        
        mapTmx.createFromObjects('Camada de Objetos 1', 1, 'hole', 0, true, false, this.holeMap, Hole);     
        mapTmx.createFromObjects('Camada de Objetos 1', 2, 'box', 0, true, false, this.map, Block);
        mapTmx.createFromObjects('Camada de Objetos 1', 3, 'boxVertical', 0, true, false, this.map, Block);
        mapTmx.createFromObjects('Camada de Objetos 1', 10, 'droid', 0, true, false, this.enemieMap, Enemie);     
        mapTmx.createFromObjects('Camada de Objetos 1', 13, 'star', 0, true, false, this.itemMap, Star);
        
    }
    
    
    createMap3(){
		this.time = 0;
		this.numberOfLevel++;
		this.textTime.setText("TEMPO: "+this.time);
		this.textLevels.setText("Level:3/5 ");
		this.ball.body.x = this.game.width/2;
		this.ball.body.y = this.game.height-40;
		this.ball.body.velocity.x = 0;
        this.ball.body.velocity.y = 0;
        
        this.map.destroy()
        this.holeMap.destroy()
        this.enemieMap.destroy()
        this.itemMap.destroy()
        
        // Mapa level 3
        let mapTmx = this.game.add.tilemap('level3');
        this.game.world.setBounds(0, 0, mapTmx.widthInPixels, mapTmx.heightInPixels);
        
        this.map = this.game.add.group()
        this.holeMap = this.game.add.group()
        this.enemieMap = this.game.add.group()
        this.itemMap = this.game.add.group()
        
        mapTmx.createFromObjects('Camada de Objetos 1', 1, 'hole', 0, true, false, this.holeMap, Hole);     
        mapTmx.createFromObjects('Camada de Objetos 1', 2, 'box', 0, true, false, this.map, Block);
        mapTmx.createFromObjects('Camada de Objetos 1', 3, 'boxVertical', 0, true, false, this.map, Block);
        mapTmx.createFromObjects('Camada de Objetos 1', 10, 'droid', 0, true, false, this.enemieMap, Enemie);     
        mapTmx.createFromObjects('Camada de Objetos 1', 13, 'star', 0, true, false, this.itemMap, Star);
        
    }

    createMap4(){
		this.time = 0;
		this.numberOfLevel++;
		this.textTime.setText("TEMPO: "+this.time);
		this.textLevels.setText("Level:4/5 ");
		this.ball.body.x = this.game.width/2;
		this.ball.body.y = this.game.height-40;
		this.ball.body.velocity.x = 0;
        this.ball.body.velocity.y = 0;
        
        this.map.destroy()
        this.holeMap.destroy()
        this.enemieMap.destroy()
        this.itemMap.destroy()
        
        // Mapa level 4
        let mapTmx = this.game.add.tilemap('level4');
        this.game.world.setBounds(0, 0, mapTmx.widthInPixels, mapTmx.heightInPixels);
        
        this.map = this.game.add.group()
        this.holeMap = this.game.add.group()
        this.enemieMap = this.game.add.group()
        this.itemMap = this.game.add.group()
        
        mapTmx.createFromObjects('Camada de Objetos 1', 2, 'box', 0, true, false, this.map, Block);
        mapTmx.createFromObjects('Camada de Objetos 1', 3, 'boxVertical', 0, true, false, this.map, Block);
        mapTmx.createFromObjects('Camada de Objetos 1', 10, 'droid', 0, true, false, this.enemieMap, Enemie);     
        mapTmx.createFromObjects('Camada de Objetos 1', 11, 'fire', 0, true, false, this.enemieMap, Fire);     
        mapTmx.createFromObjects('Camada de Objetos 1', 1, 'hole', 0, true, false, this.holeMap, Hole);
        mapTmx.createFromObjects('Camada de Objetos 1', 13, 'star', 0, true, false, this.itemMap, Star);
        
    }

    createMap5(){
        // Parar audio level e iniciar audio final
        if(this.audioStatus) {
            this.audioFinal.play()
        }

        this.time = 0;
		this.numberOfLevel++;
		this.textTime.setText("TEMPO: "+this.time);
		this.textLevels.setText("Level:5/5 ");
		this.ball.body.x = this.game.width/2;
		this.ball.body.y = this.game.height-40;
		this.ball.body.velocity.x = 0;
        this.ball.body.velocity.y = 0;
        
        this.map.destroy()
        this.holeMap.destroy()
        this.enemieMap.destroy()
        this.itemMap.destroy()
        
        // Mapa level 4
        let mapTmx = this.game.add.tilemap('level5');
        this.game.world.setBounds(0, 0, mapTmx.widthInPixels, mapTmx.heightInPixels);
        
        this.map = this.game.add.group()
        this.holeMap = this.game.add.group()
        this.enemieMap = this.game.add.group()
        this.itemMap = this.game.add.group()
        
        mapTmx.createFromObjects('Camada de Objetos 1', 2, 'box', 0, true, false, this.map, Block);
        mapTmx.createFromObjects('Camada de Objetos 1', 3, 'boxVertical', 0, true, false, this.map, Block);
        mapTmx.createFromObjects('Camada de Objetos 1', 10, 'droid', 0, true, false, this.enemieMap, Enemie);     
        mapTmx.createFromObjects('Camada de Objetos 1', 11, 'fire', 0, true, false, this.enemieMap, Fire);     
        mapTmx.createFromObjects('Camada de Objetos 1', 1, 'hole', 0, true, false, this.holeMap, Hole);
        mapTmx.createFromObjects('Camada de Objetos 1', 4, 'boss', 0, true, false, this.enemieMap, Boss);     
        mapTmx.createFromObjects('Camada de Objetos 1', 13, 'star', 0, true, false, this.itemMap, Star);
        
    }


    handleOrientation(e) {
        var y = e.beta;
        var x = e.gamma;
        this.ball.body.velocity.x += x;
        this.ball.body.velocity.y += y;
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
        this.physics.arcade.collide(this.ball, this.map, this.boxCollision, null, this);
        
        //Controle
        if (this.keys1.leftKey.isDown) {
            this.ball.body.velocity.x -= 10;
        } else
        if (this.keys1.rightKey.isDown) {
            this.ball.body.velocity.x += 10;
        }

        if (this.keys1.upKey.isDown) {
            this.ball.body.velocity.y -= 10;
        } else 
        if (this.keys1.downKey.isDown) {
            this.ball.body.velocity.y += 10;
        }

        // Colisão
        this.physics.arcade.collide(this.ball, this.holeMap, this.finishLevel, null, this)
        this.physics.arcade.collide(this.ball, this.enemieMap, this.restart, null, this)
        this.physics.arcade.collide(this.ball, this.itemMap, this.getStar, null, this)
        

        // Limite da bola
        this.screenBounds()
    }

    boxCollision() {
        if(this.audioStatus) {
            this.hitSound.play();
        }

        if("vibrate" in window.navigator) {
            window.navigator.vibrate(100);
        }

    }

    updateTime(){
        this.time = this.time+1
        this.textTime.text = 'TIME: '+this.time 
    }

    finishLevel(){
        if(this.star == 1){
            //Audio finald e level
            if(this.audioStatus) {
                this.audioLevel.play()
            }
                    
            alert('Congrads, complete phase!! !\nGame total time: '+this.time+' segundos!');
    
            if(this.numberOfLevel == 1){
                this.star = 0
                this.createMap2()
            
            } else if(this.numberOfLevel == 2){
                this.star = 0
                this.createMap3()
            
            }else if(this.numberOfLevel == 3){
                this.star = 0
                this.createMap4()
    
            }else if(this.numberOfLevel == 4){
                this.star = 0
                if(this.audioStatus) {   
                    this.audioLevel.stop()
                }
                this.createMap5()
                
            }else {
                this.star = 0
                this.audioLevel.stop()
                this.audioLevel1.stop()    
                
                if(this.audioStatus) {
                    this.audioLevel1.play()
                }
                //this.game.camera.onFadeComplete.removeAll(this)            
                this.map.destroy()
                this.holeMap.destroy()
                this.enemieMap.destroy()
                this.itemMap.destroy()
    
                this.textLevels.destroy()
                this.textTime.destroy()
                this.pauseButton.destroy()            
                
                this.state.start('GameOver')
            }
        }
        
	
    }

    screenBounds() {
        if (this.ball.y < this.game.height/12+this.ball.width) {
            this.ball.y = this.game.height/12+this.ball.width
        }
    }
    
    restart(){
        this.audioLevel.stop();
        
        if(this.audioStatus) {
            this.hitSound.play();
            this.audioDie.play();
    
        }

        
        alert('Too bad, you\'ve died! :(');
        
        this.map.destroy()
        this.holeMap.destroy()
        this.enemieMap.destroy()
        this.itemMap.destroy()

        this.time = 0;
		this.textTime.setText("Tempo: "+this.time);
		this.textLevels.setText("Level:1/3 ");
		this.ball.body.x = this.game.width/2;
		this.ball.body.y = this.game.height-40;
		this.ball.body.velocity.x = 0;
        this.ball.body.velocity.y = 0;
        
        this.createMap()
    }

    getStar(){
        this.star = 1
        this.itemMap.destroy()
    }

    
    render() {
      //this.game.debug.body(this.ball)
        //this.holeMap.forEach( this.game.debug.body, this.game.debug, true);
        //this.map.forEach( this.game.debug.body, this.game.debug, true);
        //this.enemieMap.forEach( this.game.debug.body, this.game.debug, true);
       // this.itemMap.forEach( this.game.debug.body, this.game.debug, true);
        
        
    }
}

window.onload = function() {
    // funciona como singleton
    const GAME = new Game()
}