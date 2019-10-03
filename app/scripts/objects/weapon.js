import Player from "./player";

export default class Weapon extends Phaser.GameObjects.Sprite {
    /**
     *  My custom sprite.
     *
     *  @constructor
     *  @class Weapon
     *  @extends Phaser.GameObjects.Sprite
     *  @param {Phaser.Scene} scene - The scene that owns this sprite.
     *  @param {number} x - The horizontal coordinate relative to the scene viewport.
     *  @param {number} y - The vertical coordinate relative to the scene viewport.
     */
    constructor(scene, x, y) {
      super(scene, x, y, 'weapon');
      this.scene = scene;
      const anims = scene.anims;
      anims.create({
        key: 'sword-basic-anim',
        frames: anims.generateFrameNumbers('sword-basic', {start: 0, end: 10}),
        frameRate: 4,
        repeat: -1
      });
  
      this.sprite = scene.add
        .sprite(x, y,'sword-basic', 0)
        .setSize(10, 23);
  
      this.sprite.anims.play('sword-basic-anim');
      
      this.keys = scene.input.keyboard.createCursorKeys();
    }

    /* Picks up a weapon from the ground.
   * @param weapon - weapon being picked up.
   * @param oldWeapon - weapon currently held.
   */
    pickupWeapon(weapon, oldWeapon, player) {
      weapon.destroy();
      const newWeapon = this.scene.add
        .sprite(0, 0,'sword-basic', 0)
        .setSize(16, 23);
      newWeapon.setScale(0.7);
      newWeapon.x = -7;
      newWeapon.y = 0;
      this.scene.physics.world.enable(newWeapon);
      newWeapon.anims.play('sword-basic-anim', false, player.sprite.anims.currentFrame.index);
      player.setActiveWeapon(newWeapon);
      player.playerBox.add(newWeapon);
      if (oldWeapon)
        oldWeapon.destroy();
    }
  
    update() {
      const keys = this.keys;
      const sprite = this.sprite;

      if(keys.space.isDown){
        console.log("ATTACK!!!!")
      } else {
        //sprite.anims.play('weapon-idle', true);
      }
  
    }
  
    destroy() {
      this.sprite.destroy();
    }
  }
  