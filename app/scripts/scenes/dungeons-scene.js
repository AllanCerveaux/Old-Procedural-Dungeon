import Dungeon from '@mikewesthad/dungeon';
import Player from '../objects/player';
import TILES from '../objects/tiles-mapping';

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
    this.load.image('tiles', 'tilesets/_DungeonTilesets.png');
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
    this.dungeon = new Dungeon({
      width: 50,
      height: 50,
      rooms: {
        width: {min: 7, max: 15, onlyOdd: true},
        height: {min: 7, max: 15, onlyOdd: true},
        maxRooms: 12
      }
    });

    const map = this.make.tilemap({
      tileWidth: 16,
      tileHeight: 16,
      width: this.dungeon.width,
      height: this.dungeon.height
    });
    const tileset = map.addTilesetImage('tiles', null, 16, 16, 0, 0);
    this.groundLayer = map.createBlankDynamicLayer('Ground', tileset);
    this.wallLayer = map.createBlankDynamicLayer('WALL', tileset);
    this.objectLayer = map.createBlankDynamicLayer('Object', tileset);

    // this.groundLayer.fill(TILES.BLANK);

    this.dungeon.rooms.forEach(room => {
      const { x, y, width, height, left, right, top, bottom } = room;

      this.groundLayer.weightedRandomize(x+1, y+1, width-2, height-2, TILES.FLOOR);
      this.groundLayer.putTilesAt(TILES.DOOR, x, y);


      this.groundLayer.weightedRandomize(left + 1, top, width - 2, 1, TILES.WALL.TOP);
      this.groundLayer.weightedRandomize(left + 1, bottom, width - 2, 1, TILES.WALL.TOP);
      this.groundLayer.weightedRandomize(left, top + 1, 1, height - 2, TILES.WALL.TOP);
      this.groundLayer.weightedRandomize(right, top + 1, 1, height - 2, TILES.WALL.TOP);

      let doors = room.getDoorLocations();
      for (let i = 0; i < doors.length; i++) {
        if (doors[i].y === 0) {
          this.groundLayer.putTileAt(TILES.DOOR, x + doors[i].x, y + doors[i].y);
        } else if (doors[i].y === room.height - 1) {
          this.groundLayer.putTileAt(TILES.DOOR, x + doors[i].x, y + doors[i].y);
        } else if (doors[i].x === 0) {
          this.groundLayer.putTileAt(TILES.DOOR, x + doors[i].x, y + doors[i].y);
        } else if (doors[i].x === room.width - 1) {
          this.groundLayer.putTileAt(TILES.DOOR, x + doors[i].x, y + doors[i].y);
        }
      }
    });

    this.groundLayer.setCollisionByExclusion([129, 130, 131, 161, 162, 163, 194]);

    this.player = new Player(this, map.widthInPixels / 2, map.heightInPixels / 2);
    // this.physics.add.collider(this.player.sprite, layer);
    this.physics.add.collider(this.player.sprite, this.groundLayer);

    const camera = this.cameras.main;
    // camera.setZoom(2.5);
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
