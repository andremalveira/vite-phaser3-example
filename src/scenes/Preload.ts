import Phaser from 'phaser';

export default class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    console.log(`✅ ${this.scene.key}`);


  }

  create() {
      this.add.text(this.game.config.width as number / 2.1, this.game.config.height as number / 2, 'Preload Scene ✅');
  }
}
