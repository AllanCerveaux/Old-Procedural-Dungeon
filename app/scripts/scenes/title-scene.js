import * as config from '../config.js';

export default class TitleScene extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'TitleScene'});
  }

  /**
   *  Called when this scene is initialized.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  init(/* data */) {
    //Pan velocity for the map.
    //Note: if these are the same value, the bouncing is boring.
    this.panVelocityX = 25;
    this.panVelocityY = 18;

  }

  /**
   *  Used to declare game assets to be loaded using the loader plugin API.
   *
   *  @protected
   */
  preload() {
    this.load.image('bg', 'title-map.png');
    
  }

  /**
   *  Responsible for setting up game objects on the screen.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  create(/* data */) {
    var music = this.sound.add('titleMusic',{volume:0.15,loop:true});
    music.play();

    const bgStartX = Math.floor(Math.random()*800);
    const bgStartY = Math.floor(Math.random()*600);
    this.bgMap = this.physics.add.image(bgStartX, bgStartY, 'bg');
    this.bgMap.setVelocity(this.panVelocityX, this.panVelocityY);
    


    const title = this.add.text(0, 0, 'PROCEDURAL DUNGEON', {
      font: 'bold 70px Courier New',
      color: 'white'
    });
    title.setOrigin(-0.03, -1);

    const instructions = this.add.text(0, 0, 'Arrow keys to move.\n\nSpace to slash.\n\nFind the stairs. Go deeper.\n\n\nClick anywhere to begin.', {
      font: '30px Courier New',
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      wordWrap: true,
      align: 'center',
      padding: {
        left: 20,
        right: 20,
        top: 40,
        bottom: 40
      }
    });
    instructions.setOrigin(-0.25, -0.7);

    const github = this.add.text(config.width - 130, config.height - 20, 'Contribute on GitHub', {
      font: '12px Arial',
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      align: 'center',
      padding: {
        left: 10,
        right: 10,
        top: 3,
        bottom: 3
      }
    });

    github.setInteractive().on('pointerup', function(pointer) {
      window.open('https://github.com/AllanCerveaux/Procedural-Dungeon', '_blank');
    });
    

    //Clicking anywhere (except on the GitHub link) switches to Level 1.
    this.input.on('pointerup', function(pointer) {
      if (pointer.x < config.width - 130 && pointer.y < config.height - 20)
        this.scene.scene.start('DungeonScene');
        music.stop(); //Stops title music when Level 1 loads
    });

  }

  /**
   *  Handles updates to game logic, physics and game objects.
   *
   *  @protected
   *  @param {number} t - Current internal clock time.
   *  @param {number} dt - Time elapsed since last update.
   */
  update(/* t, dt */) {

    //This is the code that causes the map in the background to bounce around pleasantly.
    if (this.bgMap.x > config.width && this.panVelocityX > 0) {
      this.panVelocityX *= -1;
    }
    else if (this.bgMap.x < 0 && this.panVelocityX < 0) {
      this.panVelocityX *= -1;
    }
    
    if (this.bgMap.y > config.height && this.panVelocityY > 0) {
      console.log(this.bgMap.y, config.height);
      this.panVelocityY *= -1;
    }
    else if (this.bgMap.y < 0 && this.panVelocityY < 0) {
      this.panVelocityY *= -1;
    }
      this.bgMap.setVelocity(this.panVelocityX, this.panVelocityY);
  }

  /**
   *  Called after a scene is rendered. Handles rendering post processing.
   *
   *  @protected
   */
  render() {
  }

  /**
   *  Called when a scene is about to shut down.
   *
   *  @protected
   */
  shutdown() {
  }

  /**
   *  Called when a scene is about to be destroyed (i.e.: removed from scene
   *  manager). All allocated resources that need clean up should be freed up
   *  here.
   *
   *  @protected
   */
  destroy() {
  }
}
