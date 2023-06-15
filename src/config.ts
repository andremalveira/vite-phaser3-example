import Phaser from 'phaser';


export const  config = {
  type: Phaser.AUTO,
  parent: 'db739594-062e-4b43-b0b5-3d3e3d17846e',
  backgroundColor: '#222',
  scale: {
    width: 1920,
    height: 1080,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  dom:  { 
    createContainer :  true 
  },
  plugins: {
   
  }
};

