export default class Orc2 extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);
    this.scene = scene;
    this.lastAnim = null;
    this.alpha = 0;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.anims.play('orcIdle', true);
    this.setTint(0xF13D43); // add a tint to differenciate monster orc
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active) {
      let animationName;
      const player = this.scene.player.playerBox;
      if (Phaser.Math.Distance.Between(player.x, player.y, this.x, this.y) <= 60) {
        const targetAngle = Phaser.Math.Angle.Between(
          this.x, this.y,
          player.x, player.y,
        );
        this.body.velocity.x = Math.cos(targetAngle) * 30;
        this.body.velocity.y = Math.sin(targetAngle) * 30;
        animationName = 'orcWalk';
      } else {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        animationName = 'orcIdle';
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
}