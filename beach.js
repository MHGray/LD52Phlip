Beach = function(difficulty = 0){
    this.difficulty = difficulty;
    this.gauge = {
        x: game.width/3,
        y: game.height /2 -20,
        width: game.width/3,
        height: 40,
        juice: 0,
        targetStart: game.randInt(70),
        targetSize: game.randInt(20,5),
        targetEnd: 0,
        mode: 1
    }
    this.baseSpeed = 12;

    this.gauge.targetEnd = Math.min(this.gauge.targetStart + this.gauge.targetSize, 100);

    this.update = function(){

        this.gauge.juice += game.delta /(this.baseSpeed - this.difficulty)* this.gauge.mode;

        //increase while mode is positive, decrease while negative, switch on either end
        if(this.gauge.juice > 100){
            this.gauge.mode = -1;
            this.gauge.juice = 100;
        }else if(this.gauge.juice < 0){
            this.gauge.juice = 0;
            this.gauge.mode = 1;
        }
    }

    this.draw = function(){
        game.artist.drawRect(game.width/3, game.height/2 -20, game.width/3, 40, '#CCC');
        game.artist.drawRect(game.width/3, game.height/2 -20, this.gauge.juice/100 * game.width/3, 40, 'green' );
        
        let xScale = game.width/300;

        game.artist.drawRect(game.width/3 + (this.gauge.targetStart * xScale), game.height/2 -20, (this.gauge.targetEnd - this.gauge.targetStart) * xScale, 40, 'red');
    }
}