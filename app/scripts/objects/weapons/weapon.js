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
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);
    this.config = config;
    this.scene = scene;
    this.scene.add.existing(this);
    scene.physics.world.enable(this);
    this.body.setSize(this.config.size.x, this.config.size.y)
    this.body.offset.y = 1;
    this.setDepth(11);
  }

  preUpdate(t, dt){
    super.preUpdate(t, dt);
  }

    /* 
     * Stop attacking function.
     * This returns the weapon to the player's side when not in use and is called in player.update when the space bar is released.
     */
  sheathe() {
    const { x, y, lastDirection } = this.scene.player;
    if (lastDirection === 'right') {
      this.x = x - 7;
      this.y = y - 3;
      this.angle = 0;
      this.setFlipX(true);
    }
    else {
      this.x = x + 7;
      this.y = y - 3;
      this.angle = 0;
      this.setFlipX(false);
    }
    if(!this.anims.isPlaying){
      return;
    }
    this.anims.stop();
  }

  attack() {
    const { x, y, facing } = this.scene.player;
    switch (facing) {
      case 'right':
        this.x = x + 13;
        this.y = y;
        this.angle = 90;
        this.body.setSize(this.config.size.y, this.config.size.x);
        this.body.offset.x = 3;
        this.setFlipX(true);
        break;
      case 'left':
        this.x = x - 13;
        this.y = y ;
        this.angle = 270;
        this.body.setSize(this.config.size.y, this.config.size.x);
        this.body.offset.x = -5;
        this.setFlipX(false);
        break;
      case 'top':
        this.x = x;
        this.y = y - 13;
        this.angle = 0;
        this.body.setSize(this.config.size.x, this.config.size.y);
        this.body.offset.y = 1;
        this.setFlipX(false);
        break;
      case 'bottom':
        this.x = x;
        this.y = y + 13;
        this.angle = 180;
        this.body.setSize(this.config.size.x, this.config.size.y);
        this.body.offset.y = 10;
        break;
      default:
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.body.setSize(0, 0);
        this.angle = 180;
    }
    this.anims.play(this.config.anim, true);
  }

  /* Places a sprite on the ground at the specified x and y values.
    *  @param scene - scene this is happening on.
    *  @param x, y - x and y values of placement.
    *  NOTE: 
    */
  dropWeapon(scene, x, y) {
    this.sprite = scene.add
      .sprite(x, y, this.spriteKey, 0);
  
    this.sprite.anims.play(this.config.anim);
  }

  /* Picks up a weapon from the ground.
    *  @param player - player object
    *  NOTE: The scale, x, and y values here are hardcoded for sword_basic at the moment.
    *        If you plan to add another weapon, please look for a way to generalize those values.
    */
  pickupWeapon(player) {
    if (player.getActiveWeapon()){
      player.getActiveWeapon.destroy();
    }
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    player.setActiveWeapon(this);

    this.anims.play(this.config.anim, false, player.anims.currentFrame.index);
  }
  
  update() {
  }
  
  destroy() {
    this.body.destroy();
  }
}
  