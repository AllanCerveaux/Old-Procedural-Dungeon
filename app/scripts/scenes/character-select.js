import Player from '../objects/player/player'

export default class CharacterSelect extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'CharacterSelect'});
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
  }

  /**
   *  Responsible for setting up game objects on the screen.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  create(/* data */) {
    this.add.text(180, 150, 'Choose your character', {
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
    let knight_frame = this.add.image(100, 300, 'frame');
    new Player(this, knight_frame.x, knight_frame.y, {idle: `knight_idle`, walk: `knight_walk`}).setScale(3);
    let elf_frame = this.add.image(300, 300, 'frame');
    new Player(this, elf_frame.x, elf_frame.y, {idle: `elf_idle`, walk: `elf_walk`}).setScale(3);
    let lizard_frame = this.add.image(500, 300, 'frame');
    new Player(this, lizard_frame.x, lizard_frame.y, {idle: `lizard_idle`, walk: `lizard_walk`}).setScale(3);
    let wizzard_frame = this.add.image(700, 300, 'frame');
    new Player(this, wizzard_frame.x, wizzard_frame.y, {idle: `wizzard_idle`, walk: `wizzard_walk`}).setScale(3);
    let scene = this.scene

    knight_frame.setInteractive().on('pointerup', (pointer,x, y, gameObject) => {
      scene.start('DungeonScene', {character: 'knight'})
    })

    elf_frame.setInteractive().on('pointerup', (pointer,x, y, gameObject) => {
      scene.start('DungeonScene', {character: 'elf'})
    })
   
    lizard_frame.setInteractive().on('pointerup', (pointer,x, y, gameObject) => {
      scene.start('DungeonScene', {character: 'lizard'})
    })
    
    wizzard_frame.setInteractive().on('pointerup', (pointer,x, y, gameObject) => {
      scene.start('DungeonScene', {character: 'wizzard'})
    })
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
