import Monster from './monster';

export default class Imp extends Monster{
  /**
   *  My custom sprite.
   *
   *  @constructor
   *  @class Imp
   *  @extends Phaser.GameObjects.Sprite
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   *  @param {number} x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} y - The vertical coordinate relative to the scene viewport.
   */
  constructor(scene, x, y, config) {
    super(scene, x, y, config);
    this.body.setSize(9,9);
    this.body.offset.y = 4;
  }
}
