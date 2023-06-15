import Phaser from 'phaser';

export default class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    console.log(`✅ ${this.scene.key}`);


  }

  create() {
    
  }
}
