import Weapon from '../objects/weapon';

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
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.scene = scene;
    const anims = scene.anims;
    anims.create({
      key: 'player-idle',
      frames: anims.generateFrameNumbers('knight-idle', {start: 0, end: 19}),
      frameRate: 4,
      repeat: -1
    });

    anims.create({
      key: 'player-run',
      frames: anims.generateFrameNumbers('knight-run', {start: 0, end: 16}),
      frameRate: 4,
      repeat: -1
    });


    this.sprite = scene.add
      .sprite(0,0,'knight-idle', 0)
      .setSize(12, 15);

    this.sprite.anims.play('player-idle');

    this.playerBox = scene.add.container(x, y);
    this.playerBox.setSize(12, 15);
    scene.physics.world.enable(this.playerBox);
    this.playerBox.add(this.sprite);
    this.playerBox.body.offset.y = 2;
    this.playerBox.body.offset.x = -1;

    this.keys = scene.input.keyboard.createCursorKeys();
  }

  freeze() {
    this.playerBox.body.moves = false;
  }

  getActiveWeapon() {
    return this.activeWeapon;
  }

  setActiveWeapon(weapon) {
    this.activeWeapon = weapon;
  }

  update() {
    const keys = this.keys;
    const playerBox = this.playerBox;
    const sprite = this.sprite;
    const speed = 100;
    //const prevVeloc48ity = sprite.body.velocity.clone();

    playerBox.body.setVelocity(0);

    if(keys.left.isDown){
      playerBox.body.setVelocityX(-speed);
      sprite.setFlip(true);
      this.playerBox.body.offset.x = 0;
      this.activeWeapon.x = 7;
    }else if (keys.right.isDown){
      playerBox.body.setVelocityX(speed);
      sprite.setFlip(false);
      this.playerBox.body.offset.x = 0;
      this.activeWeapon.x = -7;

    }

    if(keys.up.isDown){
      playerBox.body.setVelocityY(-speed);
    }else if(keys.down.isDown){
      playerBox.body.setVelocityY(speed);
    }

    playerBox.body.velocity.normalize().scale(speed);

    if(keys.left.isDown || keys.right.isDown || keys.down.isDown || keys.up.isDown){
      sprite.anims.play('player-run', true);
    }else {
      //sprite.anims.play('player-idle', true);
    }

  }

  destroy() {
    this.sprite.destroy();
  }
}
