import Player from "./player";

export default class Weapon extends Phaser.GameObjects.Sprite {
  /**
     *  My custom sprite.
     *
     *  @constructor
     *  @class Weapon
     *  @extends Phaser.GameObjects.Sprite
     *  @param {Phaser.Scene} scene - The scene that owns this sprite.
     *  @param {object} weaponInfo - JSON object with details of the weapon to be created.
     *      weaponInfo.animKey = animation key.
     *      weaponInfo.spriteStr = sprite reference.
     */

  //If you would like the player to hold the weapon, follow this with weapon.pickupWeapon.
  //If the weapon is being left in the overworld, follow this with weapon.dropWeapon.
  constructor(scene, weaponInfo) {
    super(scene, 'weapon');
    this.animKey = weaponInfo.animStr;
    this.spriteKey = weaponInfo.spriteStr;
    this.scene = scene;
    const anims = scene.anims;
    anims.create({
      key: this.animKey,
      frames: anims.generateFrameNumbers(this.spriteKey, {start: 0, end: 10}),
      frameRate: 4,
      repeat: -1
    });
      
  }

  /* Places a sprite on the ground at the specified x and y values.
    *  @param scene - scene this is happening on.
    *  @param x, y - x and y values of placement.
    *  NOTE: 
    */
  dropWeapon(scene, x, y) {
    this.sprite = scene.add
      .sprite(x, y, this.spriteKey, 0);
  
    this.sprite.anims.play(this.animKey);
  }

  /* Picks up a weapon from the ground.
    *  @param player - player object
    *  NOTE: The scale, x, and y values here are hardcoded for sword_basic at the moment.
    *        If you plan to add another weapon, please look for a way to generalize those values.
    */
  pickupWeapon(player) {
    if (player.getActiveWeapon())
      player.getActiveWeapon.destroy();
    this.scene.physics.world.enable(this);
    player.setActiveWeapon(this);
    this.sprite = this.scene.add
      .sprite(0, 0, this.spriteKey, 0)
      .setScale(0.7);
    this.sprite.x = -7;
    this.sprite.y = 0;
    player.playerBox.add(this.sprite);
    this.sprite.anims.play(this.animKey, false, player.sprite.anims.currentFrame.index);
      
  }
  
  update() {
  }
  
  destroy() {
    this.sprite.destroy();
  }
}
  