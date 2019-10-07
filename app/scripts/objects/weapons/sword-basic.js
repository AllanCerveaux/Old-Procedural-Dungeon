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

  /* Change by BlunT76
  * added this.sprite.body.setSize to adapt the sword body
  * added ability to attack on top and bottom of the player while moving
  * so we can now destroy all the objects blocking the doors
  */
  attack(player) {
    if (player.facing === 'right') {
      this.sprite.setScale(1);
      this.sprite.x = 13;
      this.sprite.y = 5;
      this.sprite.angle = 90;
      this.sprite.body.setSize(20, 5);
    } else {
      this.sprite.setScale(1);
      this.sprite.x = -13;
      this.sprite.y = 5;
      this.sprite.angle = 270;
      this.sprite.body.setSize(20, 5);
    }
    if (player.keys.up.isDown) {
      this.sprite.x = 0;
      this.sprite.y = -13;
      this.sprite.angle = 0;
      this.sprite.body.setSize(5, 20);
    }
    if (player.keys.down.isDown) {
      this.sprite.x = 0;
      this.sprite.y = 13;
      this.sprite.angle = 180;
      this.sprite.body.setSize(5, 20);
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
      this.sprite.body.setSize(1, 1);
    }
    else {
      this.sprite.setScale(0.7);
      this.sprite.x = 7;
      this.sprite.y = 0;
      this.sprite.angle = 0;
      this.sprite.body.setSize(1, 1);
    }
  }
  
  update() {
      
  
  }
  
  destroy() {
    this.sprite.destroy();
  }
}
  