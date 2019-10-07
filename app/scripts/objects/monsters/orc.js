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
  
    constructor(scene, monsterInfo) {
        super(scene, {animStr: 'orc-idle-anim', spriteStr: 'orc'}); 
        
    }
    
    update(t, dt) {
        //TODO: every second, move one or turn one
    }
    
    destroy() {
      this.sprite.destroy();
    }
  }
    