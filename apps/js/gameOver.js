'use strict'

var content = [
    " ",
    "Work done by \npor:",
    "Noemi Scherer",
    " ",
    "Nelson Vieira",
    " ",
    "Subject: \nGame \nDevelopment",
    "Prof. Dr. Marcos\n Silvano",
    "    ",
    "UTFPR 2017",
    "Campo\n Mourão",
    "Thank you!!",
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
        this.game.world.setBounds(0, 0, 320, 480);
        
        // Fundo
        let background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background')
        

        //Dados
        var txtName = this.game.add.text(this.game.world.centerX, 100,'BALL HIT',{font:'50px Arial Black',fill:'#696969'});
        txtName.anchor.set(0.5);
        txtName.stroke = "#FFF5EE";
        txtName.strokeThickness = 16;
        txtName.setShadow(2, 2, "#DA70D6", 2, true, false);

        
        var gameover = this.game.add.text(this.game.world.centerX,200, 'GAME OVER', { font: "30px Arial", fill: "#e4beef",  align: "center", stroke: "#320C3E", strokeThickness: 4  })
        gameover.anchor.set(0.5)

        this.game.add.sprite(this.game.width, this.game.height, 'background')
        text = this.game.add.text(50, 280, '', { font: "20pt Arial Black", fill: "#e4beef", align: "center", stroke: "#320C3E", strokeThickness: 2 });      
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
            this.game.time.events.add(Phaser.Timer.SECOND * 1, this.nextLine, this);
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
