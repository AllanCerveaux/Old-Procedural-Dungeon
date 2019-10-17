export default class Monster extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);
    this.config = config;
    this.scene = scene;
    this.lastAnim = null;
    this.alpha = 0;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.anims.play(config.anim.idle, true);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active) {
      let animationName;
      const player = this.scene.player;
      if (Phaser.Math.Distance.Between(player.x, player.y, this.x, this.y) <= 60) {
        const targetAngle = Phaser.Math.Angle.Between(
          this.x, this.y,
          player.x, player.y,
        );
        this.body.velocity.x = Math.cos(targetAngle) * 30;
        this.body.velocity.y = Math.sin(targetAngle) * 30;
        animationName = this.config.anim.walk;
      } else {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        animationName = this.config.anim.idle;
      }

      if (this.lastAnim !== animationName) {
        this.lastAnim = animationName;
        this.animate(animationName, true);
      }
    }
  }

  animate(str) {
    this.anims.play(str, true);
  }

  die() {
    this.destroy();
  }
}