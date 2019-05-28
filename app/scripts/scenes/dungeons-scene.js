import Dungeon from '@mikewesthad/dungeon';
import Player from '../objects/player';
import TILES from '../objects/tiles-mapping';
import TilemapVisibility from '../objects/tilemap-visibility';

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
      doorPadding: 2,
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
    this.groundLayer = map.createBlankDynamicLayer('Ground', tileset).fill(TILES.BLANK);
    this.objectLayer = map.createBlankDynamicLayer('Object', tileset);
    const shadowLayer = map.createBlankDynamicLayer('Shadow', tileset).fill(TILES.BLANK);

    this.tilemapVisibility = new TilemapVisibility(shadowLayer);


    this.dungeon.rooms.forEach(room => {
      const { x, y, width, height, left, right, top, bottom } = room;

      this.groundLayer.weightedRandomize(x+1, y+1, width-2, height-2, TILES.FLOOR);


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

    const rooms = this.dungeon.rooms.slice();
    const startRoom = rooms.shift();
    const endRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
    const otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);

    this.objectLayer.putTileAt(TILES.STAIRS, endRoom.centerX, endRoom.centerY);

    otherRooms.forEach(room => {
      let rand = Math.random();
      if(rand <= 0.25) {
        this.objectLayer.putTileAt(TILES.CHEST, room.centerX, room.centerY);
      }else if (rand <= 0.5) {
        const x = Phaser.Math.Between(room.left + 2, room.right - 2);
        const y = Phaser.Math.Between(room.top + 2, room.bottom - 2);
        this.objectLayer.weightedRandomize(x, y, 1, 1, TILES.SKULL);
      }else {
        if (room.height >= 5) {
          this.objectLayer.putTileAt(TILES.SKULL, room.centerX - Math.floor(Math.random() * (3 - 1) + 1), room.centerY + Math.floor(Math.random() * (3 - 1) + 1));
          this.objectLayer.putTilesAt(TILES.BOX, room.centerX - Math.floor(Math.random() * (3 - 1) + 1), room.centerY + Math.floor(Math.random() * (3 - 1) + 1));
          this.objectLayer.putTilesAt(TILES.BOX, room.centerX + Math.floor(Math.random() * (3 - 1) + 1), room.centerY - Math.floor(Math.random() * (3 - 1) + 1));
        } else {
          this.objectLayer.putTilesAt(TILES.BOX, room.centerX - Math.floor(Math.random() * (5 - 1) + 1), room.centerY - Math.floor(Math.random() * (3 - 1) + 1));
          this.objectLayer.putTilesAt(TILES.BOX, room.centerX + Math.floor(Math.random() * (5 - 1) + 1), room.centerY - Math.floor(Math.random() * (3 - 1) + 1));
        }
      }
    });

    this.groundLayer.setCollisionByExclusion([129, 130, 131, 161, 162, 163, 194]);
    this.objectLayer.setCollision([430, 431, 462]);

    const playerRoom = startRoom;
    const x = map.tileToWorldX(playerRoom.centerX);
    const y = map.tileToWorldY(playerRoom.centerY);
    this.player = new Player(this, x, y);

    this.physics.add.collider(this.player.sprite, this.groundLayer);
    this.physics.add.collider(this.player.sprite, this.objectLayer);

    const camera = this.cameras.main;
    camera.setZoom(2.5);
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


    const playerTileX = this.groundLayer.worldToTileX(this.player.sprite.x);
    const playerTileY = this.groundLayer.worldToTileY(this.player.sprite.y);
    const playerRoom = this.dungeon.getRoomAt(playerTileX, playerTileY);


    this.tilemapVisibility.setActiveRoom(playerRoom);
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
