import Dungeon from '@mikewesthad/dungeon';
import Player from '../objects/player';
import Weapon from '../objects/weapon';
import Sword_Basic from '../objects/weapons/sword-basic';
import TILES from '../objects/tiles-mapping';
import TilemapVisibility from '../objects/tilemap-visibility';
import LevelGenerator from '../plugins/level-generator';
import { runInThisContext } from 'vm';
import Orc from '../objects/monsters/orc';

export default class DungeonScene extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'DungeonScene'});

    this.level = 0;
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
    this.level++;
    this.hasPlayerReachedStairs = false;
    
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

    if (this.level == 1){
      this.music = this.sound.add('musicCalm',{volume:0.15,loop:true});
      this.music.play();
    }
    else if(this.level > 1 && this.level < 3){
      this.music.stop();
      this.music = this.sound.add('musicIntense',{volume:0.15,loop:true});
      this.music.play();
    }
    else if(this.level >= 3){
      this.music.stop();
      this.music = this.sound.add('musicYouDied', {volume:0.15,loop:true});
      this.music.play();
    }
    
    
    const tileset = map.addTilesetImage('tiles', null, 16, 16, 0, 0);
    this.groundLayer = map.createBlankDynamicLayer('Ground', tileset).fill(TILES.BLANK);
    this.objectLayer = map.createBlankDynamicLayer('Object', tileset);
    const shadowLayer = map.createBlankDynamicLayer('Shadow', tileset).fill(TILES.BLANK);

    this.tilemapVisibility = new TilemapVisibility(shadowLayer);

    const level = new LevelGenerator(this.dungeon, {groundLayer: this.groundLayer, objectLayer: this.objectLayer});
    level.init();

    const rooms = this.dungeon.rooms.slice();
    const startRoom = rooms.shift();

    this.groundLayer.setCollisionByExclusion([129, 130, 131, 161, 162, 163, 194]);
    this.objectLayer.setCollision([430, 431, 462]);
    

    //Position player and starting weapon
    const playerRoom = startRoom;
    const x = map.tileToWorldX(playerRoom.centerX);
    const y = map.tileToWorldY(playerRoom.centerY);
    this.player = new Player(this, x, y);

    this.weapon = new Sword_Basic(this);
    this.weapon.pickupWeapon(this.player);

    this.spawnEnemies(rooms, map);

    this.objectLayer.setTileIndexCallback(TILES.STAIRS, () => {
      this.objectLayer.setTileIndexCallback(TILES.STAIRS, null);
      this.hasPlayerReachedStairs = true;
      this.player.freeze();
      const cam = this.cameras.main;
      cam.fade(250, 0, 0, 0);
      cam.once('camerafadeoutcomplete', () => {
        this.player.destroy();
        this.scene.restart();
      });
    });

    
    this.physics.add.collider(this.player.playerBox, this.groundLayer);
    this.physics.add.collider(this.player.playerBox, this.objectLayer);
    
    /* 
    * Check for collision overlap between weapons and objectLayer
    * TODO: add breaking object animation, add breaking object sound
    */
    this.physics.add.overlap(this.player.activeWeapon.sprite, this.objectLayer, (player, obj) => {
      if (obj.index > 0 && this.player.attacking) {
        this.objectLayer.removeTileAt(obj.x, obj.y);
      }
    }, null, this);

    const camera = this.cameras.main;
    camera.setZoom(2);
    camera.startFollow(this.player.playerBox);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.add
      .text(map.widthInPixels / 2 - 190, 160, `Find the stairs. Go deeper.\nCurrent level: ${this.level}`, {
        font: '8px monospace',
        fill: '#000000',
        padding: { x: 10, y: 10 },
        backgroundColor: '#ffffff'
      })
      .setScrollFactor(0)
      .setDepth(1);
    
    // Add Lights
    this.lights.enable();
    this.lights.setAmbientColor(0x222222);
    this.groundLayer.setPipeline('Light2D');
    this.objectLayer.setPipeline('Light2D');
    this.lightPoint = this.lights.addLight(this.player.playerBox.x, this.player.playerBox.y, 80, 0xedcf6d, 3);
    this.tweens.add({
      targets: this.lightPoint,
      intensity: {
        value: 2.5,
        duration: 120,
        ease: 'Elastic.easeIn',
        repeat: -1,
        yoyo: true
      },
      radius: {
        value: 85.0,
        duration: 200,
        ease: 'Elastic.easeOut',
        repeat: -1,
        yoyo: true
      }
    });

    

  }

  /**
   *  Handles updates to game logic, physics and game objects.
   *
   *  @protected
   *  @param {number} t - Current internal clock time.
   *  @param {number} dt - Time elapsed since last update.
   */
  update(/* t, dt */){
    if (this.hasPlayerReachedStairs) return;
    this.player.update();
    this.lightPoint.x = this.player.playerBox.x;
    this.lightPoint.y = this.player.playerBox.y;

    const playerTileX = this.groundLayer.worldToTileX(this.player.playerBox.x);
    const playerTileY = this.groundLayer.worldToTileY(this.player.playerBox.y);
    const playerRoom = this.dungeon.getRoomAt(playerTileX, playerTileY);


    this.tilemapVisibility.setActiveRoom(playerRoom);
  }

  //Spawns up to four enemies per room. Change maxEnemies parameter to tweak.
  spawnEnemies(rooms, map) {
    this.enemies = [];
    const maxEnemies = 4;

    rooms.forEach(room => {

      const enemyCount = Math.floor(Math.random() * maxEnemies);
      for (let i = 0; i < enemyCount; i++) {
        
        let spawnX = Phaser.Math.Between(room.left + 1, room.right - 1);
        let spawnY = Phaser.Math.Between(room.bottom - 1, room.top + 1);

        let enemy = new Orc(this, map.tileToWorldX(spawnX)+9, map.tileToWorldY(spawnY)+4);
        this.enemies.push(enemy);
      }
    });
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
