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
      frames: anims.generateFrameNumbers('knight-idle', {start: 0, end: 16}),
      frameRate: 4,
      repeat: 0
    });

    anims.create({
      key: 'player-run',
      frames: anims.generateFrameNumbers('knight-run', {start: 0, end: 16}),
      frameRate: 4,
      repeat: -1
    });


    this.sprite = scene.physics.add
      .sprite(x,y,'knight-idle', 0)
      .setSize(12, 15);

    this.sprite.body.offset.y = 5;
    this.sprite.body.offset.x = 3;

    this.sprite.anims.play('player-idle');

    this.keys = scene.input.keyboard.createCursorKeys();
  }

  freeze() {
    this.sprite.body.moves = false;
  }

  update() {
    const keys = this.keys;
    const sprite = this.sprite;
    const speed = 100;
    //const prevVeloc48ity = sprite.body.velocity.clone();

    sprite.body.setVelocity(0);

    if(keys.left.isDown){
      sprite.body.setVelocityX(-speed);
      sprite.setFlip(true);
      this.sprite.body.offset.x = 5;
    }else if (keys.right.isDown){
      sprite.body.setVelocityX(speed);
      sprite.setFlip(false);
      this.sprite.body.offset.x = 4;

    }

    if(keys.up.isDown){
      sprite.body.setVelocityY(-speed);
    }else if(keys.down.isDown){
      sprite.body.setVelocityY(speed);
    }

    sprite.body.velocity.normalize().scale(speed);

    if(keys.left.isDown || keys.right.isDown || keys.down.isDown || keys.up.isDown){
      sprite.anims.play('player-run', true);
    }else {
      sprite.anims.play('player-idle', true);
    }

  }

  destroy() {
    this.sprite.destroy();
  }
}
