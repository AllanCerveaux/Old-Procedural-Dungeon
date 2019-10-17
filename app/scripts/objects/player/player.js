export default class Player extends Phaser.GameObjects.Sprite {
  /**
   *  My custom sprite.
   *
   *  @constructor
   *  @class Player
   *  @extends Phaser.GameObjects.Sprite
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   *  @param {number} x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} y - The vertical coordinate relative to the scene viewport.
   */
  constructor(scene, x, y, config) {
    super(scene, x, y, config);
    this.scene = scene;
    this.config = config;
    this.scene.add.existing(this);
    scene.physics.world.enable(this);
    this.setFrame(0);
    this.anims.play(this.config.idle);
    this.body.setSize(10, 12);
    this.body.offset.y = 16;
    this.body.offset.x = 12;
    this.moving = false;
    this.attacking = false;
    this.facing = 'right';
    this.lastDirection = 'right';
    this.lastAnim = null;
    this.keys = scene.input.keyboard.createCursorKeys();
  }

  preUpdate(t, dt){
    super.preUpdate(t, dt);
    const keys = this.keys;
    const speed = 100;

    this.body.setVelocity(0);
    
    if(keys.left.isDown) {
      this.facing = 'left';
      this.lastDirection = 'left';
      this.body.setVelocityX(-speed);
      this.setFlip(true);
    } else if (keys.right.isDown){
      this.facing = 'right';
      this.lastDirection = 'right';
      this.body.setVelocityX(speed);
      this.setFlip(false);

    }

    if(keys.up.isDown) {
      this.lastDirection = 'down';
      this.facing = 'top';
      this.setFlip(true);
      this.body.setVelocityY(-speed);
    } else if(keys.down.isDown) {
      this.lastDirection = 'up';
      this.facing = 'bottom';
      this.setFlip(true);
      this.body.setVelocityY(speed);
    }

    this.body.velocity.normalize().scale(speed);

    if(keys.left.isDown || keys.right.isDown || keys.down.isDown || keys.up.isDown) {
      this.moving = true;
      this.anims.play(this.config.walk, true);
    } else if (this.moving) {
      this.moving = false;
      this.anims.play(this.config.idle, true);
    }
    if (keys.space.isDown) {
      this.attacking = true;
      this.scene.weapon.attack(this);
    } else {
      this.attacking = false;
      this.facing = 'top';
      this.scene.weapon.sheathe(this);
    }
  }

  freeze() {
    this.body.moves = false;
  }

  getActiveWeapon() {
    return this.activeWeapon;
  }

  setActiveWeapon(weapon) {
    this.activeWeapon = weapon;
  }
  
  die() {
    this.destroy();
  }
}
