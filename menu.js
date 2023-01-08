let Menu = function(){
  this.x = 0;
  this.y = 0;
  this.width = game.width;
  this.height = game.height;
  this.color = 'white';
  this.hasLoaded = false;
  this.buttons = [];
  this.boxes = [];
  this.questionAnswer = undefined;
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
          game.player.started = true;
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
    load: function(message, background){
      Menu.apply(this);
      this.name = "Message";
      this.message = message;
      this.background = background;

      this.buttons.push(new Button({
        x: game.width/2 + 5,
        y: (game.height * 3 / 4) + 15,
        width: game.width / 6 - 5,
        height: 50,
        text: 'Okay',
        callback: function(){
          game.exitMenu();
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
      game.artist.drawImage(game.images[this.background],0,0,game.width,game.height);
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
      this.background = "backgroundChoose";
      this.days = ['Mon', 'Tue','Wed','Thu','Fri','Sat'];
      this.lastDay = false;
      this.particles = [];
      game.maestro.playMusic('choose');

      let menuLeft = 2*game.width/3;
      let menuTop = 3*game.height/4;
      let menuWidth = game.width/3-5;
      let menuHeight = game.height/4-5;

      // this.buttons.push(new Button({
      //   x: game.width/2 + 5,
      //   y: (game.height * 3 / 4) + 15,
      //   width: game.width / 6 - 5,
      //   height: 50,
      //   text: 'Okay',
      //   callback: function(){
      //     console.log('okay');
      //     game.exitMenu();
      //   }
      // }));

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
          game.enterMenu(Menus.garageLocationMenu.load());

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

      this.buttons.push(new Button({
        x: menuLeft + 2,
        y: menuTop + 2 + 3*menuHeight/4,
        width: menuWidth - 4,
        height: (menuHeight/4) - 4,
        text: 'Leave to Market',
        callback: function(){
          console.log('Sending to cukeds game');
          game.leaveToCukeds();
        }
      }));

      return this;
    },
    update: function(){
      this.buttons.forEach(btn =>{
        btn.update();
      })
      if(game.player.days > 4 && !this.lastDay){
        this.lastDay == true;
        this.buttons.forEach(btn=> {
          if(btn.text!='Leave to Market'){
            btn.update = function(){};
            btn.draw = function(){};
          }
        })
      }

      if(this.particles.length < game.player.items.length * 100){       
        if(game.player.items.length == 1){
          for(let i = 0; i < 100; i++){
            this.particles.push(new Particle(179,339));
          }
        }
        if(game.player.items.length == 2){
          for(let i = 0; i < 100; i++){
            this.particles.push(new Particle(414,339));
          }
        }
        if(game.player.items.length == 3){
          for(let i = 0; i < 100; i++){
            this.particles.push(new Particle(639,339));
          }
        }
        if(game.player.items.length == 4){
          for(let i = 0; i < 100; i++){
            this.particles.push(new Particle(864,339));
          }
        }
        if(game.player.items.length == 5){
          for(let i = 0; i < 100; i++){
            this.particles.push(new Particle(1114,339));          
          }
        }
      }

      this.particles.forEach(part => part.update());

    },
    draw: function(){
      game.artist.drawImage(game.images[this.background], 0,0,game.width, game.height);
      this.particles.forEach(part => part.draw());
      game.artist.drawRect(2*game.width/3, 3*game.height/4, game.width/3-5, game.height/4-5, '#ccc');

      game.artist.writeText(this.days[game.player.days], 875,200,40, 'black');

      if(game.player.items.length > 0){
        game.artist.drawImage(game.images[`item${game.player.items[0].id}`], 115,275,128, 128);
      }
      
      if(game.player.items.length > 1){
        game.artist.drawImage(game.images[`item${game.player.items[1].id}`], 350,275,128, 128);
        
      }
      if(game.player.items.length > 2){
        game.artist.drawImage(game.images[`item${game.player.items[2].id}`], 575,275,128, 128);
        
      }
      if(game.player.items.length > 3){
        game.artist.drawImage(game.images[`item${game.player.items[3].id}`], 800,275,128, 128);
        
      }
      if(game.player.items.length > 4){
        game.artist.drawImage(game.images[`item${game.player.items[4].id}`], 1050,275,128, 128); 
      }


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
      this.realizationTime = 1500;
      this.background = 'backgroundBeach';
      this.chances = 5;
      this.keepingItem = false;
      this.curItem = undefined;
      this.possibleItems = [];
      this.shouldBeep = false;
      game.maestro.playMusic('beach');

      for(let i = 1; i <= 35; i++){
        if(!(i %3)){
          this.possibleItems.push(i);
        }
      }

      // this.buttons.push(new Button({
      //   x: game.width/2 + 5,
      //   y: (game.height * 3 / 4) + 15,
      //   width: game.width / 6 - 5,
      //   height: 50,
      //   text: 'Okay',
      //   callback: function(){
      //     console.log('okay');
      //     game.exitMenu();
      //   }
      // }));

      this.buttons.push(new Button({
        x: game.width /2 -150,
        y: game.height / 3 * 2,
        width: 300,
        height: 50,
        text: `Stop and Dig`,
        callback: function(){
          game.player.action = true;
          game.maestro.play('dig');
        }
      }))

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
        mode: 1,
        stop: false,
      }
      this.baseSpeed = 12;

      this.gauge.targetEnd = Math.min(this.gauge.targetStart + this.gauge.targetSize, 100);

      return this;
    },
    update: function(){
      this.buttons.forEach(btn =>{
        btn.update();
      })
      
      if(game.player.action){
        game.player.action = false;
        this.gauge.stop = true;
      }
      
      if(this.questionAnswer != undefined){
        if(this.questionAnswer){//Keeping Item?
          game.player.addItem(this.curItem, Math.round(Math.random()*90 + 10)/10)
          game.maestro.playMusic('choose');
          game.exitMenu();
          game.player.days++;
          return;
        }else{
          this.curItem = undefined;
        }

        this.questionAnswer = undefined;
      }else if(this.chances <= 0){
        
        game.player.days++;
        game.maestro.playMusic('choose');
        game.exitMenu();
        game.enterMenu(Menus.messageMenu.load("It is getting too late to metal detect. Better head home.", 'backgroundBeach'))
        return;
      }

      //increase while mode is positive, decrease while negative, switch on either end
      if(this.gauge.stop && this.realizationTime > 0){
        this.realizationTime -= game.delta;
      }else if(this.gauge.stop){
        this.realizationTime = 1500;
        this.curItem = this.possibleItems[game.randInt(this.possibleItems.length)];
        this.chances--;
        this.gauge.stop = false;
        
        
        if(this.gauge.juice >= this.gauge.targetStart && this.gauge.juice <= this.gauge.targetEnd){
          game.enterMenu(Menus.itemGetMenu.load(this.curItem, this.background));
        }else{
          game.enterMenu(Menus.itemMissedMenu.load('backgroundBeach'));
          this.curItem = undefined;
          //Display failure message
        }

        //reset gauge
        this.gauge.targetStart = game.randInt(70);
        this.gauge.targetSize = game.randInt(20,5);
        this.gauge.targetEnd = Math.min(this.gauge.targetStart + this.gauge.targetSize, 100);
      }else{
        //move gauges
        this.gauge.juice += game.delta /(this.baseSpeed - this.difficulty)* this.gauge.mode;
      }

      //update gauge
      if(this.gauge.juice > 100){
        this.gauge.mode = -1;
          this.gauge.juice = 100;
      }else if(this.gauge.juice < 0){
          this.gauge.juice = 0;
          this.gauge.mode = 1;
      }

    },
    draw: function(){
      game.artist.drawImage(game.images['backgroundBeach'], 0,0,game.width, game.height);
      //game.artist.drawRect(2*game.width/3, 3*game.height/4, game.width/3-5, game.height/4-5, '#ccc');
      
      //game.artist.drawRect(game.width/3, game.height/2 -20, game.width/3, 40, '#CCC');
      //game.artist.drawRect(game.width/3, game.height/2 -20, this.gauge.juice/100 * game.width/3, 40, 'green' );
      
      let xScale = game.width/300;
      
      //game.artist.drawRect(game.width/3 + (this.gauge.targetStart * xScale), game.height/2 -20, (this.gauge.targetEnd - this.gauge.targetStart) * xScale, 40, 'red');
      if(this.gauge.juice > this.gauge.targetStart && this.gauge.juice < this.gauge.targetEnd){ // In the good spot
        game.artist.drawImage(game.images['metalDetectorGood'],this.gauge.juice/100 * game.width/3 + game.width/3, game.height/2 -256, 256, 256);
        if(this.shouldBeep){
          game.maestro.play('beep');
          this.shouldBeep = false;
        }
      }else{
        game.artist.drawImage(game.images['metalDetectorBad'],this.gauge.juice/100 * game.width/3 + game.width/3, game.height/2 -256, 256, 256);
          this.shouldBeep = true;
      }
      //game.artist.drawRect(this.gauge.juice/100 * game.width/3 + game.width/3, game.height/2 -20, 2, 40, 'blue' );
      
      //okay button
      this.buttons.forEach(btn =>{
        btn.draw();
      })
    }
  },

  storageLocationMenu:{
    load: function(){
      Menu.apply(this);
      this.name = "beachLoaction";
      this.realizationTime = 1500;
      this.background = 'backgroundBeach';

      this.buttons.push(new Button({
        x: game.width/2 + 5,
        y: (game.height * 3 / 4) + 15,
        width: game.width / 6 - 5,
        height: 50,
        text: 'Okay',
        callback: function(){
          console.log('okay');
          game.maestro.playMusic('choose');
          game.exitMenu();
        }
      }));

      this.buttons.push(new Button({
        x: game.width /2 -150,
        y: game.height / 3 * 2,
        width: 300,
        height: 50,
        text: `Stop and Dig`,
        callback: function(){
          game.player.action = true;
        }
      }))

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
        mode: 1,
        stop: false,
      }
      this.baseSpeed = 12;

      this.gauge.targetEnd = Math.min(this.gauge.targetStart + this.gauge.targetSize, 100);

      return this;
    },
    update: function(){
      this.buttons.forEach(btn =>{
        btn.update();
      })
      
      if(game.player.action){
        game.player.action = false;
        this.gauge.stop = true;
      }
      
      //increase while mode is positive, decrease while negative, switch on either end
      if(this.gauge.stop && this.realizationTime > 0){
        this.realizationTime -= game.delta;
      }else if(this.gauge.stop){
        if(this.gauge.juice >= this.gauge.targetStart && this.gauge.juice <= this.gauge.targetEnd){
          game.exitMenu();
          game.enterMenu(Menus.itemGetMenu.load(2, this.background));
        }else{
          game.exitMenu();
          game.enterMenu(Menus.itemMissedMenu.load('backgroundBeach'));
          //Display failure message
        }
        
      }else{
        this.gauge.juice += game.delta /(this.baseSpeed - this.difficulty)* this.gauge.mode;
      }
      if(this.gauge.juice > 100){
        this.gauge.mode = -1;
          this.gauge.juice = 100;
      }else if(this.gauge.juice < 0){
          this.gauge.juice = 0;
          this.gauge.mode = 1;
      }

    },
    draw: function(){
      game.artist.drawImage(game.images['backgroundBeach'], 0,0,game.width, game.height);
      game.artist.drawRect(2*game.width/3, 3*game.height/4, game.width/3-5, game.height/4-5, '#ccc');
      game.artist.writeText(this.realizationTime, 10,10,10,'red');
      
      game.artist.drawRect(game.width/3, game.height/2 -20, game.width/3, 40, '#CCC');
      game.artist.drawRect(game.width/3, game.height/2 -20, this.gauge.juice/100 * game.width/3, 40, 'green' );
      
      let xScale = game.width/300;
      
      game.artist.drawRect(game.width/3 + (this.gauge.targetStart * xScale), game.height/2 -20, (this.gauge.targetEnd - this.gauge.targetStart) * xScale, 40, 'red');
      game.artist.drawRect(this.gauge.juice/100 * game.width/3 + game.width/3, game.height/2 -20, 2, 40, 'blue' );
      
      //okay button
      this.buttons.forEach(btn =>{
        btn.draw();
      })
    }    
  },

  garageLocationMenu:{
    load: function(){
      Menu.apply(this);
      this.name = "beachLoaction";
      this.realizationTime = 1500;
      this.background = 'backgroundBeach';
      this.xOffset = game.width/4;
      this.yOffset = game.height/4;
      this.showingPhase = true;
      this.shufflePhase = false;
      this.shuffleRound = 0;
      this.readyToPick = false;
      this.endReveal = false;
      this.timeLeftThisRound = 2000;
      this.timeBetweenRounds = 1000 * (1- game.round/10);
      this.maxRounds = game.round * 2 + 2;
      this.chosenCard = {x: -1, y:-1};
      this.success = false;
      this.possibleItems = [];
      
      for(let i = 1; i <= 35; i++){
        if(!((i+1) %3)){
          this.possibleItems.push(i);
        }
      }

      this.curItem = this.possibleItems[game.randInt(this.possibleItems.length)];

      this.positions = {};
      this.positions.values = [0,1,2,3,4,5];
      this.positions.shuffle = function(){
        this.temp = [];
        while(this.values.length > 0){
          this.temp.push(this.values.splice(game.randInt(this.values.length),1)[0]);
        }
        this.values = this.temp;
      }
      this.positions.possibleCardPositions = [
        {
          x:game.width/3 - this.xOffset,
          y: game.height/3 - this.yOffset
        },
        {
          x:game.width/3 * 2 - this.xOffset,
          y: game.height / 3 * 2 - this.yOffset
        },
        {
          x:game.width - this.xOffset,
          y: game.height/3 - this.yOffset
        },
        {
          x:game.width/3 - this.xOffset,
          y: game.height / 3 * 2 - this.yOffset
        },
        {
          x:game.width/3*2 - this.xOffset,
          y: game.height/3 - this.yOffset
        },
        {
          x:game.width - this.xOffset,
          y: game.height / 3 * 2 - this.yOffset
        },
      ]
      this.positions.getPos = function(){
        return this.possibleCardPositions[this.values.pop()];
      }
      this.positions.reset = function(){
        this.values = [0,1,2,3,4,5];
        this.shuffle();
      }

      this.cards = [];
      let card = function(params){
        this.x = params.x;
        this.y = params.y;
        this.xOrig = params.x;
        this.yOrig = params.y;
        this.target = params.target;
        this.isGood = params.isGood;

        this.update = function(){
          let menu = game.getCurMenu();
          if(menu.shufflePhase){
            this.x += (this.target.x - this.xOrig )/ menu.timeBetweenRounds * game.delta;
            this.y += (this.target.y - this.yOrig )/ menu.timeBetweenRounds * game.delta;
          }else{
            this.x = this.target.x;
            this.y = this.target.y;
          }
        },

        this.draw = function(){
          if(game.getCurMenu().showingPhase || game.getCurMenu().endReveal){
            if(this.isGood)
              game.artist.drawImage(game.images['goodCard'], this.x, this.y, 256,256);
            else
              game.artist.drawImage(game.images['garbageCard'], this.x, this.y, 256,256);
            return;
          }
          game.artist.drawImage(game.images['cardBack'], this.x, this.y, 256,256);
        }
      }

      for(let i = 0; i < 4; i++){
        let good = Boolean(!i);
        let position = this.positions.getPos();
        this.cards.push(new card({
          x:position.x,
          y:position.y,
          target: {
            x: 0,
            y: 0
          },
          isGood: good
        }))
      }

      this.positions.reset();

      for(let i = 0; i < 4; i++){
        this.cards[i].target = this.positions.getPos();
      }
      this.positions.reset();

      for(let i = 0; i < 6; i++){
        let pos = this.positions.getPos();
        let yOffset = 256;
        this.buttons.push(new Button({
          x:pos.x,
          y:pos.y + yOffset,
          width: game.width / 6 - 5,
          height: 50,
          text: "Guess This One",
          callback: function(){
            console.log(`clicked ${this.x} ${this.y}`)
            if(game.getCurMenu().readyToPick)
              game.getCurMenu().chosenCard = {x:this.x,y:this.y - yOffset};
          }
        }))
      }

      

      return this;
    },
    update: function(){
      if(this.questionAnswer){//Keeping Item?
        game.player.addItem(this.curItem, Math.round(Math.random()*90 + 10)/10)
        game.maestro.playMusic('choose');
        game.exitMenu();
        game.player.days++;
        return;
      }

      this.buttons.forEach(btn => btn.update());
      this.cards.forEach(card => card.update());

      if(this.showingPhase){
        this.timeLeftThisRound -= game.delta;
        if(this.timeLeftThisRound <= 0){
          //Go into shufflePhase
          this.shufflePhase = true;
          this.showingPhase = false;
        }
      }

      if(this.shufflePhase){
        if(this.timeLeftThisRound <= 0){ // Start New Shuffle Phase
          //check if maxed out
          if(this.shuffleRound == this.maxRounds){
            this.shufflePhase = false;
            this.readyToPick = true;
            return;
          }
          this.positions.reset();
          this.cards.forEach(card => {
            card.target = this.positions.getPos()
            card.xOrig = card.x;
            card.yOrig = card.y;
          });
          this.shuffleRound++;
          this.timeLeftThisRound = this.timeBetweenRounds;
        }else{
          this.timeLeftThisRound -= game.delta;
        }
      }

      if(this.readyToPick){
        if(this.chosenCard.x >= 0){ //card has been chosen
          let card = this.cards.find(c => c.x == this.chosenCard.x && c.y == this.chosenCard.y);
          console.log(card);
          if(card == undefined){
            this.chosenCard = {x:-1,y:-1};
          }else{
            //found the card
            //go to reveal phase
            if(card.isGood) this.success = true;
            this.readyToPick = false;
            this.endReveal = true;
            this.timeLeftThisRound = 1500;
          }
        }
      }

      if(this.endReveal){
        this.timeLeftThisRound -= game.delta;
        if(this.timeLeftThisRound <= 0){
          if(this.success){
            
            game.enterMenu(Menus.itemGetMenu.load(this.curItem, 'backgroundGarage'));
          }else{
            game.exitMenu();
            game.enterMenu(Menus.itemMissedMenu.load('backgroundGarage'));
          }
        }
      }

      //showing phase
      // this.showingPhase = true;
      //rounds

      //reveal when picked

    },
    draw: function(){
      game.artist.drawImage(game.images['backgroundGarage'], 0,0,game.width, game.height);
      

      this.cards.forEach(card => card.draw());

      //okay button
      this.buttons.forEach(btn =>{
        btn.draw();
      })
    }
  },

  itemGetMenu: {
    load: function(itemId, background){
      let obj = new Menu();
      Menu.apply(obj);
      obj.name = `item${itemId} Menu`;
      obj.itemId = itemId;
      obj.background = background;

      obj.particles = [];

      for(let i = 0; i < 200; i++){
        obj.particles.push(new Particle(game.width/2 - 10 - game.width/3 + 128, game.height/2));
      }

      obj.buttons.push(new Button({
        x: game.width/2 + 10,
        y: (game.height * 3 / 4) + 15,
        width: game.width / 3,
        height: 50,
        text: 'Huzzah',
        callback: function(){
          game.exitMenu();
          game.enterMenu(Menus.questionMenu.load("Would you like to keep this item? (one per day)", obj.background));
        }
      }));

      obj.update = this.update;
      obj.draw = this.draw;

      return obj;
    },
    update: function(){
      this.buttons.forEach(btn =>{
        btn.update();
      })
      this.particles.forEach(particle =>{
        particle.update();
      })
    },
    draw: function(){
      if(this.background){
        game.artist.drawImage(game.images[this.background], 0, 0, game.width, game.height);
      }
      
      this.particles.forEach(part=>{
        part.draw();
      })
      
      //Draw message box
      let margin = 10;
      game.artist.drawRect(game.width/2 + margin, game.height/4, game.width/3, game.height/2, '#ccc');
      game.artist.drawRectOutline(game.width/2 + margin, game.height/4, game.width/3, game.height/2, '#000');

      game.artist.writeTextFit(game.getItemById(this.itemId).description, game.width/2 + margin +10, game.height/4 + 10, 24, game.width/3 - 20, 'black');

      //Draw Image

      game.artist.drawImage(game.images[`item${this.itemId}`],game.width/2 - 10 - game.width/3, game.height/2-128, 256,256)


      //okay button
      this.buttons.forEach(btn =>{
        btn.draw();
      })

    }
  },

  itemMissedMenu: {
    load: function(background){
      Menu.apply(this);
      this.name = "Fail Message";
      this.background = background;
      this.buttons.push(new Button({
        x: game.width/2 - game.width / 3 / 2,
        y: (game.height * 3 / 4) + 15,
        width: game.width / 3,
        height: 50,
        text: 'Aww Man!',
        callback: function(){
          game.exitMenu();
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
      //Backrground Image
      if(this.background){
        game.artist.drawImage(game.images[this.background], 0, 0, game.width, game.height);
      }
      
      //Draw message box
      game.artist.drawRect(game.width/2 - game.width / 3 / 2, game.height/4, game.width/3, game.height/2, '#ccc');
      game.artist.drawRectOutline(game.width/2 - game.width / 3 / 2, game.height/4, game.width/3, game.height/2, '#000');

      game.artist.writeTextFit("You were unable to find anything of use.", game.width/2 - game.width / 3 / 2 +10, game.height/4 + 10, 24, game.width/3 - 20, 'black');

      this.buttons.forEach(btn =>{
        btn.draw();
      })

    }
  },

  questionMenu:{
    load: function(message, background){
      Menu.apply(this);
      this.name = "QuestionMenu";
      this.message = message;
      this.background = background;

      this.buttons.push(new Button({
        x: game.width/2 - game.width / 3 / 2,
        y: (game.height * 3 / 4) + 15,
        width: game.width / 6-10,
        height: 50,
        text: 'Heck Yeah!',
        callback: function(){
          game.exitMenu();
          game.getCurMenu().questionAnswer = true;
        }
      }));

      this.buttons.push(new Button({
        x: game.width/2 + 5,
        y: (game.height * 3 / 4) + 15,
        width: game.width / 6 - 5,
        height: 50,
        text: 'No!',
        callback: function(){
          game.exitMenu();
          game.getCurMenu().questionAnswer = false;
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
      //Backrground Image
      if(this.background){
        game.artist.drawImage(game.images[this.background], 0, 0, game.width, game.height);
      }
      
      //Draw message box
      game.artist.drawRect(game.width/2 - game.width / 3 / 2, game.height/4, game.width/3, game.height/2, '#ccc');
      game.artist.drawRectOutline(game.width/2 - game.width / 3 / 2, game.height/4, game.width/3, game.height/2, '#000');

      game.artist.writeTextFit(this.message, game.width/2 - game.width / 3 / 2 +10, game.height/4 + 10, 24, game.width/3 - 20, 'black');

      this.buttons.forEach(btn =>{
        btn.draw();
      })

    }
  },

}
