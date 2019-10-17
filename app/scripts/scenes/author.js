export default class Author extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Author'});
  }

  /**
   *  Called when this scene is initialized.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  init(/* data */) {
  }

  /**
   *  Used to declare game assets to be loaded using the loader plugin API.
   *
   *  @protected
   */
  preload() {
    this.load.image('author-logo', 'author/PlatypusDev.png');
    this.load.audio('author-song', 'author/Perry.mp3');
  }

  /**
   *  Responsible for setting up game objects on the screen.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  create(/* data */) {
    const logo = this.add.image(340,220, 'author-logo').setOrigin(0);
    const scene = this.scene;
    const music = this.sound.add('author-song', {volume:0.75, loop:false});
    logo.setVisible(false);
    this.cameras.main.setZoom(3);

    this.cameras.main.on('camerafadeinstart', function () {
      logo.setVisible(true);
      music.play();
    });

    this.cameras.main.on('camerafadeincomplete', function () {
      logo.setVisible(false);
      scene.start('SplashScreen');
    });

    this.cameras.main.fadeIn(4000);
  }

  /**
   *  Handles updates to game logic, physics and game objects.
   *
   *  @protected
   *  @param {number} t - Current internal clock time.
   *  @param {number} dt - Time elapsed since last update.
   */
  update(/* t, dt */) {
  }

  /**
   *  Called after a scene is rendered. Handles rendenring post processing.
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
