/// <reference path="../../node_modules/phaser/types/SpineGameObject.d.ts" />
/// <reference path="../../node_modules/phaser/types/SpinePlugin.d.ts" />
/// others type references here!

declare global {

    namespace Phaser {
        interface Game {
        
        }
        interface Scene {
           teste:string
        }
        namespace GameObjects {
            interface Text {
                
            }
            interface Image {
               
            }
            interface DOMElement {
               
            }
        }

    }

}
export {}