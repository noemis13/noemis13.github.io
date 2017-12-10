'use strict'

class StartGame extends Phaser.State {
    preload(){
        this.game.load.image('background', 'assets/screen-bg.png')
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
        var txtName = this.game.add.text(this.game.world.centerX,200,'BALL HIT',{font:'50px Arial Black',fill:'#4169E1'});
        txtName.anchor.set(0.5);
        txtName.stroke = "#F0F8FF";
        txtName.strokeThickness = 16;
        txtName.setShadow(2, 2, "#333333", 2, true, false);
    
        this.startButton = this.add.button(this.game.width*0.5, 300, 'start', this.startGame, this, 2, 0, 1);
        this.startButton.anchor.set(0.5,0);
        this.startButton.input.useHandCursor = true;
        
        this.game.time.events.add(1000,function(){
            var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
                enterKey.onDown.addOnce(this.startGame,this);
        },this);
    }

    startGame(){
        this.game.state.start('Play')
    }
    

    
}
