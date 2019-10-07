import Weapon from '../weapon';

export default class Sword_Basic extends Weapon {
  /**
     *  My custom sprite.
     *
     *  @constructor
     *  @class Sword_Basic
     *  @extends Weapon (which extends Phaser.GameObjects.Sprite)
     *  @param {Phaser.Scene} scene - The scene that owns this sprite.
     */

  constructor(scene) {
    super(scene, {animStr: 'sword-basic-anim', spriteStr: 'sword-basic'});      
  }

  /* 
     * Attack function.
     * This doesn't do anything other than move the weapon yet.
     * In future updates: if the weapon's x value overlaps an enemy, KILL IT! :)
     */
  attack(player) {
    if (player.facing === 'right') {
      this.sprite.setScale(1);
      this.sprite.x = 13;
      this.sprite.y = 5;
      this.sprite.angle = 90;
    }
    else {
      this.sprite.setScale(1);
      this.sprite.x = -13;
      this.sprite.y = 5;
      this.sprite.angle = 270;
    }
  }

  /* 
     * Stop attacking function.
     * This returns the weapon to the player's side when not in use and is called in player.update when the space bar is released.
     */
  sheathe(player) {
    if (player.facing === 'right') {
      this.sprite.setScale(0.7);
      this.sprite.x = -7;
      this.sprite.y = 0;
      this.sprite.angle = 0;
    }
    else {
      this.sprite.setScale(0.7);
      this.sprite.x = 7;
      this.sprite.y = 0;
      this.sprite.angle = 0;
    }
  }
  
  update() {
      
  
  }
  
  destroy() {
    this.sprite.destroy();
  }
}
  