export default class SplashScreen extends Phaser.Scene {
  /**
   *  Takes care of loading the main game assets, including textures, tile
   *  maps, sound effects and other binary files, while displaying a busy
   *  splash screen.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({
      key: 'SplashScreen',

      //  Splash screen and progress bar textures.
      pack: {
        files: [{
          key: 'splash-screen',
          type: 'image'
        }, {
          key: 'progress-bar',
          type: 'image'
        }]
      }
    });
  }

  /**
   *  Show the splash screen and prepare to load game assets.
   *
   *  @protected
   */
  preload() {
    //  Display cover and progress bar textures.
    this.showCover();
    this.showProgressBar();
    
    //  HINT: Declare all game assets to be loaded here.
    this.load.image('logo');
    //  Loads all music files for the game: May need to be separated into a separate function if too many audio assets are added
    this.load.audio('titleMusic', ['./sound/MusicResting.mp3']);
    this.load.audio('musicCalm', ['./sound/MusicCalm.mp3'] );
    this.load.audio('musicIntense', ['./sound/MusicIntense.mp3']);
    this.load.audio('musicYouDied', ['./sound/MusicYouDied.mp3']);
    this.load.image('bg', 'title-map.png');
    this.load.image('tiles', ['tilesets/_DungeonTilesets.png', 'tilesets/_DungeonTilesets_n.png']);
    this.load.spritesheet('sword-basic', 'spritesheets/weapons/sword_basic.png', {
      frameWidth: 10,
      frameHeight: 23
    });
    this.load.spritesheet('knight-idle', 'spritesheets/knight/knight_idle.png', {
      frameWidth: 19,
      frameHeight: 20,
    });
    this.load.spritesheet('knight-run', 'spritesheets/knight/knight_run.png', {
      frameWidth: 19,
      frameHeight: 20,
    });

    this.load.spritesheet('orc-idle', ['spritesheets/monsters/orc-idle.png', 'spritesheets/monsters/orc-idle_n.png'], {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet('orc-walk', ['spritesheets/monsters/orc-walk.png', 'spritesheets/monsters/orc-walk_n.png'], {
      frameWidth: 16,
      frameHeight: 16
    });

  }

  /**
   *  Set up animations, plugins etc. that depend on the game assets we just
   *  loaded.
   *
   *  @protected
   */
  create() {
    //  We have nothing left to do here. Start the next scene.
    //this.scene.start('DungeonScene');
    this.scene.start('TitleScene');
    this.anims.create({
      key: 'orcIdle',
      frames: this.anims.generateFrameNumbers('orc-idle', {start: 0, end: 3}),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: 'orcWalk',
      frames: this.anims.generateFrameNumbers('orc-walk', {start: 0, end: 3}),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: 'player-idle',
      frames: this.anims.generateFrameNumbers('knight-idle', {start: 0, end: 19}),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'player-run',
      frames: this.anims.generateFrameNumbers('knight-run', {start: 0, end: 3}),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'sword-basic-anim',
      frames: this.anims.generateFrameNumbers('sword-basic', {start: 0, end: 10}),
      frameRate: 4,
      repeat: -1
    });
  }

  //  ------------------------------------------------------------------------

  /**
   *  Show the splash screen cover.
   *
   *  @private
   */
  showCover() {
    this.add.image(0, 0, 'splash-screen').setOrigin(0);
  }

  /**
   *  Show the progress bar and set up its animation effect.
   *
   *  @private
   */
  showProgressBar() {
    //  Get the progress bar filler texture dimensions.
    const {width: w, height: h} = this.textures.get('progress-bar').get();

    //  Place the filler over the progress bar of the splash screen.
    const img = this.add.sprite(82, 282, 'progress-bar').setOrigin(0);

    //  Crop the filler along its width, proportional to the amount of files
    //  loaded.
    this.load.on('progress', v => img.setCrop(0, 0, Math.ceil(v * w), h));
  }
}
