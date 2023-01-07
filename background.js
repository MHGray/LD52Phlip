let Background = function(){
  this.objects = [];

  for(let i = 0; i < 500; i++){
    this.objects.push(new Star());
  }

  this.update = function(){
    this.objects.forEach(obj => {
      obj.update();
    })
  }

  this.draw = function(){
    this.objects.forEach(obj => {
      obj.draw();
    })
  }
}

let Star = function(){
  this.x = randFloat(game.width);
  this.y = randFloat(game.height);
  this.xSpeed = (randFloat(5) - 3) * 1;
  this.ySpeed = (randFloat(5) - 3) * 1;
  this.width = 3;
  this.height = 3;
  this.color = 'white';

  this.update = function(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if(this.x > game.width || this.x + this.width < 0 || this.y > game.height || this.y + this.height < 0){
      this.x = game.width/2 - this.width/2 + (randFloat(50) - 30);
      this.y = game.height/2 - this.height/2 + (randFloat(50) - 30);


      if(this.x < game.width/2){
        this.xSpeed = -randFloat(3);
      }else{
        this.xSpeed = randFloat(3);
      }

      if(this.y < game.height/2){
        this.ySpeed = -randFloat(3);
      }else{
        this.ySpeed = randFloat(3);
      }

    }
  }

  this.draw = function(){
    game.artist.drawRectObj(this);
  }
}

function randFloat(range){
  return Math.random() * range;
}
