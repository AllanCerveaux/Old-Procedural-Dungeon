import Dungeon from '@mikewesthad/dungeon';
import Player from '../objects/player';
export default class DungeonScene extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'DungeonScene'});
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
    this.load.image('tiles', 'tilesets/DungeonTileset.png');
    this.load.spritesheet('knight-idle', 'spritesheets/knight/knight_idle.png', {
      frameWidth: 20,
      frameHeight: 20,
    });
    this.load.spritesheet('knight-run', 'spritesheets/knight/knight_run.png', {
      frameWidth: 20,
      frameHeight: 20,
    });

  }

  /**
   *  Responsible for setting up game objects on the screen.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  create(/* data */) {
    const dungeon = new Dungeon({
      width: 50,
      height: 50,
      rooms: {
        width: {min: 7, max: 15},
        height: {min: 7, max: 15},
        maxRooms: 12
      }
    });

    const map = this.make.tilemap({
      tileWidth: 16,
      tileHeight: 16,
      width: dungeon.width,
      height: dungeon.height
    });
    const tileset = map.addTilesetImage('tiles', null, 16, 16, 0, 0);
    const layer = map.createBlankDynamicLayer('Layer 1', tileset);

    const mappedTiles = dungeon.getMappedTiles({empty: -1, floor: 6, door: 100, wall: 17});
    layer.putTilesAt(mappedTiles, 0, 0);
    layer.setCollision(20);

    this.player = new Player(this, map.widthInPixels / 2, map.heightInPixels / 2);
    this.physics.add.collider(this.player.sprite, layer);

    const camera = this.cameras.main;
    camera.startFollow(this.player.sprite);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.add
      .text(16, 16, 'Arrow keys to move', {
        font: '18px monospace',
        fill: '#000000',
        padding: { x: 20, y: 10 },
        backgroundColor: '#ffffff'
      })
      .setScrollFactor(0);
  }

  /**
   *  Handles updates to game logic, physics and game objects.
   *
   *  @protected
   *  @param {number} t - Current internal clock time.
   *  @param {number} dt - Time elapsed since last update.
   */
  update(/* t, dt */) {
    this.player.update();
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
