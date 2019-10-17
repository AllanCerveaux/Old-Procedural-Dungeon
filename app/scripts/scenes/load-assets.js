export const assets = (ctx) => (
  	ctx.load.spritesheet('sword-basic', 'spritesheets/weapons/sword_basic.png', {
      frameWidth: 10,
      frameHeight: 23
    }),
    ctx.load.spritesheet('knight_f_idle', 'spritesheets/hereos/knight/knight_f_idle.png', {
      frameWidth: 16,
      frameHeight: 28
    }),
    ctx.load.spritesheet('knight_f_run', 'spritesheets/hereos/knight/knight_f_run.png', {
      frameWidth: 16,
      frameHeight: 28
    }),
    ctx.load.spritesheet('lizard_f_idle', 'spritesheets/hereos/lizard/lizard_f_idle.png', {
      frameWidth: 16,
      frameHeight: 28
    }),
    ctx.load.spritesheet('lizard_f_run', 'spritesheets/hereos/lizard/lizard_f_run.png', {
      frameWidth: 16,
      frameHeight: 28
    }),
    ctx.load.spritesheet('tiny_zombie', 'spritesheets/ennemies/monsters/tiny_zombie_idle.png',{
      frameWidth: 16,
      frameHeight: 16
    }),
    ctx.load.spritesheet('tiny_zombie_run', 'spritesheets/ennemies/monsters/tiny_zombie_run.png',{
      frameWidth: 16,
      frameHeight: 16
    })
)