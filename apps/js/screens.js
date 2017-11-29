
class PlayState extends GameState {

    preload() {
        this.game.load.image('player', 'assets/ball.png')
        this.game.load.image('background', 'assets/fundoMadeira.jpg')
        this.game.load.image('box', 'assets/woodBoard.png')
        this.game.load.image('saw', 'assets/saw.png')
        this.game.load.spritesheet('hole', 'assets/hole.png', 515, 526)

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


        // Mapa do jogo
        //this.createMap()
        this.createMap_old()
        
        // players
        this.player1 = this.game.add.sprite(this.game.width/1.5, this.game.height-140, 'player')
        this.player1.anchor.setTo(0.5, 0.5)
        this.player1.scale.setTo(0.02, 0.02)
        this.game.physics.enable(this.player1, Phaser.Physics.ARCADE)
        this.player1.body.collideWorldBounds = true
        this.player1.body.bounce.set(0.8)
        this.player1.body.maxVelocity = 200
        this.player1.body.drag.set(100)
    
        // Controlar player
        window.addEventListener("deviceorientation",  this.handleOrientation.bind(this), true);
        
        // HUD
        this.text1 = this.createHealthText(this.game.width*1/9, 50, 'PLAYER A: 5')
        
        // adicionar controles de full screen a tela
        super.initFullScreenButtons()
    }

    

    /*createMap(){
        let mapTmx = this.game.add.tilemap('level1');
        this.game.world.setBounds(0, 0, mapTmx.widthInPixels, mapTmx.heightInPixels);

        this.map = this.game.add.group()   
        mapTmx.createFromObjects('Object Layer 1', 1, 'box', 0, true, false, this.map, Block);

    }*/

    createMap_old() {
        let mapData = [ "                       ",
                        "                       ",
                        "    X              X   ",
                        "                       ",
                        "                       ",
                        "                       ",
                        "            X          ",
                        "                       ",
                        "                       ",
                        "                       ",
                        "    X              X   ",
                        "                       ",
                        "                       ",
                        "                       "]
                        
        this.map = this.game.add.group()
        for (let row = 0; row < mapData.length; row++) {
            for (let col = 0; col < mapData[0].length; col++) {
                if (mapData[row][col] == 'X') {
                    let block = this.map.create(col*32, row*32, 'box')
                    //block.width = 60
                    //block.height= 60
                    //this.map.add(block)
                    this.game.physics.arcade.enable(block)
                    block.body.immovable = true
                    block.tag = 'box'
                    block.autoCull = true
                    block.scale.setTo(0.2, 0.2)
                    block.inputEnabled = true
                    block.input.enableDrag(false, true)        
                }
            }
        }
    }

    handleOrientation(e) {
        var z = e.alpha;
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
    //    game.debug.body(player1)
    //    game.debug.body(player2)
    }
}

window.onload = function() {
    // funciona como singleton
    const GAME = new Game()
}