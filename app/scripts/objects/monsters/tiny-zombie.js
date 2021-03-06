import Monster from './monster';

export default class TinyZombie extends Monster{
  /**
  *  Orc monster class.
  *
  *  @constructor
  *  @class Monster
  *  @extends Phaser.GameObjects.Sprite
  *  @param {Phaser.Scene} scene - The scene that owns this sprite.
  *  @param {object} monsterInfo - JSON object with details of the monster to be created.
  *      monsterInfo.animKey = animation key.
  *      monsterInfo.spriteStr = sprite reference.
  */

  constructor(scene, x, y, config) {
    super(scene, x, y, config);
    this.body.setSize(8,8);
    this.body.offset.y = 7;
  }
}