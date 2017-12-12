'use strict'

class StartGame extends Phaser.State {
    
    preload(){
        this.game.load.image('background', 'assets/screen-mainmenu.png')
        this.game.load.spritesheet('start', 'assets/button-start.png', 146, 51)
        
    }    

    create() {
        super.create()
        //colocar fundo
        
        this.game.renderer.roundPixels = true
        this.game.renderer.clearBeforeRender = false
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
    
        let background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background')
    
        //Dados
        var txtName = this.game.add.text(this.game.world.centerX,100,'BALL HIT',{font:'45px Arial Black',fill:'#696969'});
        txtName.anchor.set(0.5);
        txtName.stroke = "#FFF5EE";
        txtName.strokeThickness = 16;
        txtName.setShadow(2, 2, "#DA70D6", 2, true, false);
    
        this.startButton = this.add.button(this.game.width*0.5, 200, 'start', this.startGame, this, 2, 0, 1);
        this.startButton.anchor.set(0.5,0);
        this.startButton.input.useHandCursor = true;
        
        this.game.time.events.add(1000,function(){
            var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
                enterKey.onDown.addOnce(this.startGame,this);
        },this);

        
        // adicionar controles de full screen a tela
        this.initFullScreenButtons()
        
        
    }

    initFullScreenButtons() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        let fullScreenButton = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
        fullScreenButton.onDown.add(this.toggleFullScreen, this)    

    }

    toggleFullScreen() {
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        if (this.scale.isFullScreen) {
            this.scale.stopFullScreen();
        } else {
            this.scale.startFullScreen(false);
        }
    }
    startGame(){
        this.game.state.start('Play')
    }
    

    
}
