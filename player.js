  let Player = function(){
  this.items = [];
  this.infos = [];
  this.money = 100;
  this.action = false;
  this.lostMoney = 0;
  this.moneyLosingTime = 2000;
  this.moneyX = 20;
  this.moneyY = 40;
  this.xSpeed = game.randInt(21,-10);
  this.ySpeed = game.randInt(21,-10);
  this.started = false;

  this.update = function(){
    if(this.money <= 0 || game.round == 0){
      return;
    }
    if(this.moneyLosingTime > 0){
      this.moneyLosingTime -= game.delta;
    }else{
      this.moneyLosingTime = 2000;
      this.money -= game.round;
      this.lostMoneyAnimation = 0;
      this.moneyX = 20;
      this.moneyY = 40;  
      this.xSpeed = game.randInt(21,-10);
      this.ySpeed = game.randInt(21,-10);  
    }

    this.ySpeed += .1 * game.delta;
    this.moneyX += this.xSpeed * game.delta /100;
    this.moneyY += this.ySpeed * game.delta /100;
    
  }

  this.draw = function(){
    game.artist.writeTextFit(`\$${this.money}`, 20,20,20, game.width - 20, '#7F7');

    if(this.money > 0 && game.round > 0)
      game.artist.writeTextFit(`\-${game.round}`, this.moneyX, this.moneyY, 20, 80, '#B00');
  }

  this.addItem = function(id, quality){
    this.items.push({id: id, quality: quality});
  }
}

