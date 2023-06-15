import Phaser from 'phaser';
import { config } from './config';
import Preload from './scenes/Preload';

new Phaser.Game(
  Object.assign(config, {
    scene: [Preload]
  })
);
