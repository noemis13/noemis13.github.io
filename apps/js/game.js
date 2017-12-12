'use strict'

// APP DO JOGO ///////////////////////////////////////////////////////////////////
let GAME = null

class Game extends Phaser.Game {
    constructor () {        
        // Game(width, height, renderer, parent, state, transparent, antialias, physicsConfig)
        super(320, 480, Phaser.CANVAS, 'game-container', null, false, false)
		
        // adiciona estados ao jogo
        this.state.add('Play', PlayState, false)
        this.state.add('StartGame', StartGame, false)
        this.state.add('GameOver', GameOver, false)
        
        
        // this.state.start('Play')
        
        this.state.start('StartGame')
        //this.state.start('Play')
        //this.state.start('GameOver')

        GAME = this
    }

}

// CLASSE GENERICA DE TELAS 

class GameState extends Phaser.State {
    initFullScreenButtons() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        let fullScreenButton = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
        fullScreenButton.onDown.add(this.toggleFullScreen, this)    

    }

    toggleFullScreen() {
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        if (this.scale.isFullScreen) {
            this.scale.stopFullScreen();
        } else {
            this.scale.startFullScreen(false);
        }
    }
}

function fullScreen() {
    GAME.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    if (GAME.scale.isFullScreen) {
        GAME.scale.stopFullScreen();
    } else {
        GAME.scale.startFullScreen(false);
    }
}

// cria jogo
window.onload = function() {
    // funciona como singleton
    GAME = new Game()
}