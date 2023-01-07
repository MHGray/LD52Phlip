let Menu = function(){
  this.x = 0;
  this.y = 0;
  this.width = game.width;
  this.height = game.height;
  this.color = 'white';
  this.hasLoaded = false;
  this.buttons = [];
  this.boxes = [];
  this.controller = game.controller;
}

let Button = function(params){
  let keys = Object.keys(params);
  keys.forEach(key =>{
    this[key] = params[key];
  })

  this.update = function(){
    if(this.isClicked() && this.callback != undefined){
      this.callback();
    }
    if(this.isRightClicked() && this.rightClickCallback != undefined){
      this.rightClickCallback();
    }
  }

  this.isClicked = function(){
    if(game.controller.isObjClicked(this)){
      return true;
    }else{
      return false;
    }
  }

  this.isRightClicked = function(){
    if(game.controller.isObjRightClicked(this)){
      return true;
    }else{
      return false;
    }
  }

  this.isHovered = function(){

  }

  this.draw = function(){
    if(this.text != undefined){
      game.artist.drawRect(this.x,this.y,this.width,this.height,'white');
      game.artist.drawRectOutline(this.x,this.y,this.width,this.height,'black');
      game.artist.writeTextFit(this.text, this.x+10, this.y, this.height -this.height/2, this.width,'black')
    }

    if(this.image != undefined){
      game.artist.drawImage(game.images[this.image],this.x,this.y,this.width,this.height);
    }
  }
}

let Box = function(params){
  let keys = Object.keys(params);
  keys.forEach(key =>{
    this[key] = params[key];
  })

  this.update = function(){

  }



  this.isDroppedOn = function(){
    if( game.controller.x > this.x &&
        game.controller.x < this.x + this.width &&
        game.controller.y > this.y &&
        game.controller.y < this.y + this.height){
          return this;
    }else{
      return null;
    }
  }

  this.draw = function(){
    // game.artist.drawRect(this.x,this.y,this.width,this.height,'white');
    // game.artist.drawRectOutline(this.x,this.y,this.width,this.height,'black');
    // game.artist.writeTextFit(this.text, this.x+10, this.y+5, 20, this.width,'black')
    if(this.text != undefined){
      game.artist.drawRect(this.x,this.y,this.width,this.height,'white');
      game.artist.drawRectOutline(this.x,this.y,this.width,this.height,'black');
      game.artist.writeTextFit(this.text, this.x+10, this.y+5, this.height -5, this.width,'black')
    }

    if(this.image != undefined){
      game.artist.drawImage(game.images[this.image],this.x,this.y,this.width,this.height);
    }
  }
}

let Menus = {
  startMenu:{
    load: function(){
      Menu.apply(this);
      this.name = "startMenu";

      this.buttons.push(new Button({
        x: 500,
        y: 500,
        width: 600,
        height: 150,
        text: "Start Game",
        callback: function(){
          console.log('helloworld');
          game.enterMenu(Menus.chooseLocationMenu.load());
        }
      }))

      this.hasLoaded = true;
      return this;
    },
    update: function(){
      this.buttons.forEach(btn =>{
        btn.update();
      })
    },
    draw: function(){
      //game.artist.drawRect(0,0,game.width,game.height,'white');
      game.artist.drawRectOutline(5,5,game.width-10,game.height-10,'black')

      this.buttons.forEach(btn =>{
        btn.draw();
      })

    }
  },
  messageMenu: {
    load: function(message,sound){
      Menu.apply(this);
      this.name = "Message";
      this.message = message;

      this.buttons.push(new Button({
        x: game.width/2 + 5,
        y: (game.height * 3 / 4) + 15,
        width: game.width / 6 - 5,
        height: 50,
        text: 'Okay',
        callback: function(){
          if(sound != undefined){
            game.maestro.stopVoice(sound);
          }
          game.exitMenu();
          game.nextTurn();
        }
      }));

      if(sound != undefined){
        this.buttons.push(new Button({
          x: game.width/2 - game.width/6,
          y: (game.height * 3 / 4) + 15,
          width: game.width / 6 - 5,
          height: 50,
          text: 'Play Audio',
          callback: function(){
            game.maestro.playVoice(sound);
          }
        }));
      }


      return this;
    },
    update: function(){
      this.buttons.forEach(btn =>{
        btn.update();
      })
    },
    draw: function(){
      //game.artist.clearCanvas();
      //Message
      game.artist.drawRect(game.width/3, game.height/4, game.width/3, game.height/2, '#ccc');
      game.artist.drawRectOutline(game.width/3, game.height/4, game.width/3, game.height/2, '#000');
      game.artist.writeTextFit(this.message, game.width/3 + 5, game.height/4 +5, 24, game.width/3 - 10, 'black');

      //okay button
      this.buttons.forEach(btn =>{
        btn.draw();
      })
    }
  },

  chooseLocationMenu:{
    load: function(){
      Menu.apply(this);
      this.name = "chooseLocation";

      let menuLeft = 2*game.width/3;
      let menuTop = 3*game.height/4;
      let menuWidth = game.width/3-5;
      let menuHeight = game.height/4-5;

      this.buttons.push(new Button({
        x: game.width/2 + 5,
        y: (game.height * 3 / 4) + 15,
        width: game.width / 6 - 5,
        height: 50,
        text: 'Okay',
        callback: function(){
          console.log('okay');
          game.exitMenu();
        }
      }));

      this.buttons.push(new Button({
        x: menuLeft + 2,
        y: menuTop + 2,
        width: menuWidth - 4,
        height: (menuHeight/4) - 4,
        text: 'Barn',
        callback: function(){
          console.log('Barning it up');
        }
      }));

      this.buttons.push(new Button({
        x: menuLeft + 2,
        y: menuTop + 2 + menuHeight/4,
        width: menuWidth - 4,
        height: (menuHeight/4) - 4,
        text: 'Garage Sales',
        callback: function(){
          console.log('Garaging it up');
        }
      }));

      this.buttons.push(new Button({
        x: menuLeft + 2,
        y: menuTop + 2 + 2*menuHeight/4,
        width: menuWidth - 4,
        height: (menuHeight/4) - 4,
        text: 'Beach',
        callback: function(){
          console.log('Beaching it up');
          game.enterMenu(Menus.beachLocationMenu.load());
        }
      }));

      return this;
    },
    update: function(){
      this.buttons.forEach(btn =>{
        btn.update();
      })
    },
    draw: function(){
      //game.artist.clearCanvas();
      game.artist.drawRect(2*game.width/3, 3*game.height/4, game.width/3-5, game.height/4-5, '#ccc');
      
      
      //okay button
      this.buttons.forEach(btn =>{
        btn.draw();
      })
    }
  },

  beachLocationMenu:{
    load: function(){
      Menu.apply(this);
      this.name = "beachLoaction";

      this.buttons.push(new Button({
        x: game.width/2 + 5,
        y: (game.height * 3 / 4) + 15,
        width: game.width / 6 - 5,
        height: 50,
        text: 'Okay',
        callback: function(){
          console.log('okay');
          game.exitMenu();
        }
      }));

      this.difficulty = game.round * 1.5;
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

      return this;
    },
    update: function(){
      this.buttons.forEach(btn =>{
        btn.update();
      })
      this.gauge.juice += game.delta /(this.baseSpeed - this.difficulty)* this.gauge.mode;

      //increase while mode is positive, decrease while negative, switch on either end
      if(this.gauge.juice > 100){
          this.gauge.mode = -1;
          this.gauge.juice = 100;
      }else if(this.gauge.juice < 0){
          this.gauge.juice = 0;
          this.gauge.mode = 1;
      }
    },
    draw: function(){
      //game.artist.clearCanvas();
      game.artist.drawRect(2*game.width/3, 3*game.height/4, game.width/3-5, game.height/4-5, '#ccc');
      
      game.artist.drawRect(game.width/3, game.height/2 -20, game.width/3, 40, '#CCC');
        game.artist.drawRect(game.width/3, game.height/2 -20, this.gauge.juice/100 * game.width/3, 40, 'green' );
        
        let xScale = game.width/300;

        game.artist.drawRect(game.width/3 + (this.gauge.targetStart * xScale), game.height/2 -20, (this.gauge.targetEnd - this.gauge.targetStart) * xScale, 40, 'red');
      
      //okay button
      this.buttons.forEach(btn =>{
        btn.draw();
      })
    }
  }

}
