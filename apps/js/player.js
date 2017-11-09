
class Player extends Phaser.Sprite {
    constructor(game, x, y, asset) {
        super(game, x, y, asset)   
        this.anchor.setTo(0.5, 0.5)
        this.scale.setTo(2, 2)
        this.inputEnabled = true
        this.input.enableDrag(false, true)
        //biblioteca gyro
              
    }

    //update() {
        // mover player
       
    //}

}
