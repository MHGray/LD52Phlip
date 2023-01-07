var game = {
  width: 1280,
  height: 720,
	artist: null,
  images: [],
	player: null,
  round: 0,
	maestro: null,
  controller: null,
  delta: 0,
  menus: [],
  musicVolume: 15,
  sfxVolume: 20,
  voiceVolume: 20,
  sounds: [],
  music: [],
  voices: [],

	load: function(){
    this.artist = new Artist(this.width,this.height);
    this.maestro = new Maestro();
    this.controller = new MouseController(this.artist.canvas);
    this.artist.drawRect(0,0,this.width,this.height,"#aaa");
    this.background = new Background();
    
    let imageNames = ['backgroundBeach', 'backgroundStorage', 'backgroundGarage'];

    for(let i = 1; i <= 35; i++){
      imageNames.push(`item${i}`);
    }
    ////////////////////  Images
    imageNames.forEach(img => {
      this.images[img] = this.artist.loadImg('./assets/' + img + '.png');
    })
    ////////////////////  SFX
    let soundNames = [];
    soundNames.forEach(snd =>{
      this.sounds[snd] = this.maestro.loadSound(snd);
    })
    ///////////////////   Music
    let musicNames = [];
    musicNames.forEach(mus =>{
      this.music[mus] = this.maestro.loadSound(mus);
    })
    ///////////////////   Voices
    let voiceNames = [];
    voiceNames.forEach(voice =>{
      this.voices[voice] = this.maestro.loadSound(voice);
    })

    if(localStorage.sfxVolume != undefined){
      game.sfxVolume = Number(localStorage.sfxVolume);
    }
    if(localStorage.musicVolume != undefined){
      game.musicVolume = Number(localStorage.musicVolume);
    }
    if(localStorage.voiceVolume != undefined){
      game.voiceVolume = Number(localStorage.voiceVolume);
    }

    this.menus.push(Menus.startMenu.load());

    this.player = new Player();

    this.loadFromURL();
    
    //add items to player


    //set starting location


		this.start();
	},

  start: function(){
    // console.log('game started');

    let loaded = true;
    let loadCount = 0;


    Object.keys(this.images).forEach(img => {
      if(this.images[img].ready == false){
        loaded = false;
        loadCount++;
      }
    })
    Object.keys(this.sounds).forEach(snd => {
      if(this.sounds[snd].ready == false){
        loaded = false;
        loadCount++;
      }
    })
    Object.keys(this.music).forEach(mus => {
      if(this.music[mus].ready == false){
        loaded = false;
        loadCount++;
      }
    })
    Object.keys(this.voices).forEach(voc => {
      if(this.voices[voc].ready == false){
        loaded = false;
        loadCount++;
      }
    })

    if(loaded == false){
      //draw loading screen
      game.artist.drawRect(0,0,game.width,game.height, 'black')
      game.artist.writeText('Things to load: ' + loadCount, 50,50,50,'white');
      window.requestAnimationFrame(game.start.bind(this));
    }else{
      //start game
      this.update();
    }
	},

	update: function(tstamp){
    this.delta = tstamp - this.timestamp;
    this.timestamp = tstamp;

    if(this.menus.length > 0){
      this.menus[this.menus.length - 1].update(this.controller);
    }else{
      //ran out of menus
      console.log("Ran out of menus");
    }

    //controller update has to be last
    this.controller.update();
    this.draw();
	},

	draw: function(){
    this.artist.drawRect(0,0,game.width,game.height,'#78787F');

    if(this.menus.length > 0){
      this.menus[this.menus.length - 1].draw();
    }else{
      this.artist.drawRect(0,0,game.width,game.height, 'red');
      console.log('Something went wrong!');
    }

    this.artist.drawRect(game.controller.x-1, game.controller.y-1, 3,3,'red');

    window.requestAnimationFrame(game.update.bind(game));
	},

  enterMenu: function(menu){
    this.menus.push(menu);
  },

  exitMenu: function(){
    game.menus.pop();
  },

  getCurMenu: function(){
    return this.menus[this.menus.length - 1];
  },

  getMenuByName: function(name){
    return this.menus.find(menu =>{
      return menu.name == name;
    })
  }, 

  getItemById: function(id){
    return ITEMS.find(item => item.id == id);
  },

  getInfoById: function(id){
    return INFO.find(info => info.id == id);
  },

  randInt: function(range, start = 0){
    return Math.floor(Math.random() * range) + start;
  },

  randBool: function(weight = .5){
    return Boolean(Math.random() < weight);
  },

  loadFromURL: function(){
    let segs = window.location.href.split("#");

    if(segs.length == 1){ //Nothing to load
      return;
    }

    url = segs[segs.length-1];

    let parts = url.split('-');
    if(parts.length < 3){
      alert("Something went wrong. Blame Phlip");
    }
    
    let infosStr = parts[0];
    let moneyStr = parts[1];
    let roundStr = parts[2];

    console.log(url);
    infosArr = infosStr.split('i');
    infosArr.shift(); //remove the blank entry
    
    infosArr.forEach(str => {
      this.player.infos.push(Number(str));
    })
    this.player.money = Number(moneyStr.split('m')[1]);
    this.round = Number(roundStr.split('r')[1]);


  },
}

window.addEventListener('load', function(){
  game.load();
})