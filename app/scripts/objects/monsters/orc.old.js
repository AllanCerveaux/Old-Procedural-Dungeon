import Monster from './monster';

export default class Orc extends Monster {
  /**
       *  Orc monster class.
       *
       *  @constructor
       *  @class Monster
       *  @extends Phaser.GameObjects.Sprite
       *  @param {Phaser.Scene} scene - The scene that owns this sprite.
       *  @param {object} monsterInfo - JSON object with details of the monster to be created.
       *      monsterInfo.animKey = animation key.
       *      monsterInfo.spriteStr = sprite reference.
       */

  constructor(scene, x, y) {
    super(scene, {animStr: 'orc-idle-anim', spriteStr: 'orc-idle'}, x, y); 
    this.scene.physics.world.enable(this);
  }

  preUpdate(time, delta) {
    super.preUpdate(time);
    if (this.active) {
      const player = this.scene.player.playerBox;
      if (Phaser.Math.Distance.Between(player.x, player.y, this.x, this.y) <= 60) {
        const targetAngle = Phaser.Math.Angle.Between(
          this.x, this.y,
          player.x, player.y,
        );
        console.log(this)
        this.body.velocity.x = Math.cos(targetAngle) * 30;
        this.body.velocity.y = Math.sin(targetAngle) * 30;

      } else {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
      }
    }
  }

  destroy() {
    this.sprite.destroy();
  }
}
