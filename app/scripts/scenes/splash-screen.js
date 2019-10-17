import { assets } from './load-assets';
import { anims } from './load-anims';

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
    
    //  Loads all music files for the game: May need to be separated into a separate function if too many audio assets are added
    this.load.audio('titleMusic', ['./sound/MusicResting.mp3']);
    this.load.audio('musicCalm', ['./sound/MusicCalm.mp3'] );
    this.load.audio('musicIntense', ['./sound/MusicIntense.mp3']);
    this.load.audio('musicYouDied', ['./sound/MusicYouDied.mp3']);
    
    this.load.image('bg', 'title-map.png');
    this.load.image('tiles', ['tilesets/_DungeonTilesets.png', 'tilesets/_DungeonTilesets_n.png']);
    assets(this);
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
    anims(this);
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
