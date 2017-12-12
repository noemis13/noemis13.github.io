'use strict'

var content = [
    " ",
    "Trabalho realizado por:",
    "Noemi Scherer",
    " ",
    "Nelson Vieira",
    " ",
    "Disciplina: Desenvolvimento de jogos",
    "Prof. Dr. Marcos Silvano",
    "    ",
    "UTFPR 2017",
    "Campus Campo Mourão",
    "Muito obrigado!!",
];
var text;
var index = 0;
var line = '';

class GameOver extends Phaser.State {

    preload(){
        this.game.load.image('background', 'assets/screen-bg.png')  
    }    

    create() {
        super.create()      
        
        //Dados
        var txtName = this.game.add.text(this.game.world.centerX,200,'BALL HIT',{font:'50px Arial Black',fill:'#696969'});
        txtName.anchor.set(0.5);
        txtName.stroke = "#FFF5EE";
        txtName.strokeThickness = 16;
        txtName.setShadow(2, 2, "#DA70D6", 2, true, false);

        var gameover = this.game.add.text(this.game.world.centerX,300, 'GAME OVER', { font: "30pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 })
        gameover.anchor.set(0.5)

        this.game.add.sprite(this.game.width, this.game.height, 'background')
        text = this.game.add.text(32, 380, '', { font: "30pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });      
        this.nextLine();
        
    }

    updateLine() {
        
        if (line.length < content[index].length)
        {
            line = content[index].substr(0, line.length + 1);
            // text.text = line;
            text.setText(line);
        }
        else
        {
            //  Wait 2 seconds then start a new line
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
        }
        
    }
    
    nextLine() {
        
        index++;
    
        if (index < content.length)
        {
            line = '';
            this.game.time.events.repeat(80, content[index].length + 1, this.updateLine, this);
        }
        
    }

    startGame(){
        this.game.state.start('Play')
    }    
}
