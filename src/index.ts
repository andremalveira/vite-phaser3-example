import Phaser from 'phaser';

// plugins 
// import 'phaser3-rex-plugins/.....'
import 'phaser/plugins/spine/dist/SpinePlugin'

// scenes
import Preload from './scenes/Preload';

new Phaser.Game({
  //SCENES
  scene: [Preload],
  //PLUGINS
  plugins: {
    scene: [
			{ key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
		]
  },
  type: Phaser.AUTO,
  parent: 'db739594-062e-4b43-b0b5-3d3e3d17846e',
  backgroundColor: '#222',
  scale: {
    width: 1920,
    height: 1080,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
});
