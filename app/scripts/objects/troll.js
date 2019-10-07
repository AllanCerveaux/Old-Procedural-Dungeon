export default class Troll extends Phaser.GameObjects.Sprite {
    /**
     *  My custom sprite.
     *
     *  @constructor
     *  @class Troll
     *  @extends Phaser.GameObjects.Sprite
     *  @param {Phaser.Scene} scene - The scene that owns this sprite.
     *  @param {number} x - The horizontal coordinate relative to the scene viewport.
     *  @param {number} y - The vertical coordinate relative to the scene viewport.
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'troll');
        this.scene = scene;
        const anims = scene.anims;
        anims.create({
            key: 'troll-idle',
            frames: anims.generateFrameNumbers('troll-idle', { start: 0, end: 16 }),
            frameRate: 4,
            repeat: 0
        });

        anims.create({
            key: 'troll-run',
            frames: anims.generateFrameNumbers('troll-run', { start: 0, end: 16 }),
            frameRate: 4,
            repeat: -1
        });


        this.sprite = scene.physics.add
            .sprite(x, y, 'troll-idle', 0)
            .setSize(12, 15);

        this.sprite.body.offset.y = 5;
        this.sprite.body.offset.x = 3;

        this.sprite.anims.play('troll-idle');

        this.keys = scene.input.keyboard.createCursorKeys();
    }

    freeze() {
        this.sprite.body.moves = false;
    }

    update() {
        // For now, the troll is static
    }

    destroy() {
        this.sprite.destroy();
    }
}
