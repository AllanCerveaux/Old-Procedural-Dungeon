import Weapon from './weapon';

export default class SwordBasic extends Weapon {
  /**
     *  My custom sprite.
     *
     *  @constructor
     *  @class Sword_Basic
     *  @extends Weapon (which extends Phaser.GameObjects.Sprite)
     *  @param {Phaser.Scene} scene - The scene that owns this sprite.
     */

  constructor(scene, x, y) {
    super(scene, x, y, {
        anim: 'sword-basic-anim', 
        key: 'sword-basic', 
        size: {x: 5, y:12}, 
      });    
  }
  
  update() {
      
  
  }
  
  destroy() {
    this.body.destroy();
  }
}
  