export default class Monster extends Phaser.GameObjects.Sprite {
  /**
     *  Monster base class to extend for individual monster sprites.
     *
     *  @constructor
     *  @class Monster
     *  @extends Phaser.GameObjects.Sprite
     *  @param {Phaser.Scene} scene - The scene that owns this sprite.
     *  @param {object} monsterInfo - JSON object with details of the monster to be created.
     *      monsterInfo.animKey = animation key.
     *      monsterInfo.spriteStr = sprite reference.
     */

  constructor(scene, monsterInfo, x, y) {
    super(scene, 'monster');
    this.animKey = monsterInfo.animStr;
    this.spriteKey = monsterInfo.spriteStr;
    this.scene = scene;
    const anims = scene.anims;
    anims.create({
      key: this.animKey,
      frames: anims.generateFrameNumbers(this.spriteKey, {start: 0, end: 16}),
      frameRate: 4,
      repeat: -1
    });

    this.sprite = scene.add.sprite(x, y, this.spriteKey, 0);
    this.sprite.anims.play(this.animKey);
    
      
  }

  update() {
  }

  destroy() {
    this.sprite.destroy();
  }
}
