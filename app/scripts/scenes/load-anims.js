export const anims = (ctx) => (
	ctx.anims.create({
    key: 'knight_idle',
    frames: ctx.anims.generateFrameNumbers('knight_f_idle', {start: 0, end: 3}),
    frameRate: 4,
    repeat: -1
  }),
  ctx.anims.create({
    key: 'knight_run',
    frames: ctx.anims.generateFrameNumbers('knight_f_run', {start: 0, end: 3}),
    frameRate: 8,
    repeat: -1
  }),

  ctx.anims.create({
    key: "lizard_idle",
    frames: ctx.anims.generateFrameNumbers('lizard_f_idle', {start:0, end: 3}),
    frameRate: 4,
    repeat: -1
  }),
  ctx.anims.create({
    key: "lizard_run",
    frames: ctx.anims.generateFrameNumbers('lizard_f_run', {start:0, end: 3}),
    frameRate: 8,
    repeat: -1
  }),

  ctx.anims.create({
    key: "elf_idle",
    frames: ctx.anims.generateFrameNumbers('elf_f_idle', {start:0, end: 3}),
    frameRate: 4,
    repeat: -1
  }),
  ctx.anims.create({
    key: "elf_run",
    frames: ctx.anims.generateFrameNumbers('elf_f_run', {start:0, end: 3}),
    frameRate: 8,
    repeat: -1
  }),

  ctx.anims.create({
    key: "wizzard_idle",
    frames: ctx.anims.generateFrameNumbers('wizzard_f_idle', {start:0, end: 3}),
    frameRate: 4,
    repeat: -1
  }),
  ctx.anims.create({
    key: "wizzard_run",
    frames: ctx.anims.generateFrameNumbers('wizzard_f_run', {start:0, end: 3}),
    frameRate: 8,
    repeat: -1
  }),

  ctx.anims.create({
    key: 'sword-basic-anim',
    frames: ctx.anims.generateFrameNumbers('sword-basic', {start: 0, end: 10}),
    frameRate: 4,
    repeat: -1
  }),

	ctx.anims.create({
    key: 'tiny_zombie_idle',
    frames: ctx.anims.generateFrameNumbers('tiny_zombie', {start: 0, end: 3}),
    frameRate: 4,
    repeat: -1
  }),
  ctx.anims.create({
    key: 'tiny_zombie_walk',
    frames: ctx.anims.generateFrameNumbers('tiny_zombie_run', {start: 0, end: 3}),
    frameRate: 4,
    repeat: -1
  })
)