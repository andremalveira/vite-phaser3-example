import { Scene } from "phaser";
import { HexColor } from "../types/utils";

const get = (scene: Scene) => {
    const center = () => {
        let w = scene.game.config.width as number ;
        let h = scene.game.config.height as number 
        let x = w / 2;
        let y = h / 2;
        return { x, y, w, h };
    };

    return { center }
}

type CameraFade = { duration?: number; color?: string; }
export type CameraData = CameraFade & { fadeIn?: boolean, fadeOut?: boolean }
const camera = (scene: Scene, data?: CameraData) => {
    const c = '#fff';
    const d = 400;

    const on = (callback: () => void = () => null) => {
        if (data?.fadeIn) scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, callback)
        if (data?.fadeOut) scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, callback)
    }

    const fadeIn = (options?: CameraFade) => {
        const { r, g, b } = phaser.hexToRGB(options?.color ?? c)
        scene.cameras.main.fadeIn(options?.duration ?? d, r, g, b)
        const on = (callback: () => void = () => null) => {
            scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, callback)
        }
        return { on }
    }
    const fadeOut = (options?: CameraFade) => {
        const { r, g, b } = phaser.hexToRGB(options?.color ?? c)
        scene.cameras.main.fadeOut(options?.duration ?? d, r, g, b)
        const on = (callback: () => void = () => null) => {
            scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, callback)
        }
        return { on }
    }

    if (data?.fadeIn) fadeIn(data)
    if (data?.fadeOut) fadeOut(data)

    return { fadeIn, fadeOut, on }
}

type PressOptions = { duration?: number; scale?: number }
const animate = (scene: Scene, targets: any) => {
    return {
        press: (options?: PressOptions) => { scene.add.tween({ targets, yoyo: true, scale: options?.scale ?? 1.2, duration: options?.duration ?? 80, repeat: 0 }) }
    }
}
const set = (scene:Scene) => {
    var RegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

    const background = (texture: string | HexColor, options?: { fit?: 'contain' | 'cover' }) => {

        if(RegExp.test(texture as string) || texture.includes('rgb')) {
            return scene.cameras.main.setBackgroundColor(texture as string)
        } else {
            let fit = options?.fit ?? 'cover'
            let cameraX = scene.game.config.width as number
            let cameraY = scene.game.config.height as number
            let object = scene.add.image(cameraX / 2, cameraY / 2, texture as string)
            var width = object.width;
            var height = object.height;
            const imgRatio = height / width
            const winRatio = cameraY / cameraX
            if ((imgRatio < winRatio && fit === 'contain') || (imgRatio > winRatio && fit === 'cover')) {
                const h = cameraX * imgRatio; width = cameraX; height = h;
            }
            if ((imgRatio > winRatio && fit === 'contain') || (imgRatio < winRatio && fit === 'cover')) {
                const w = cameraX * winRatio / imgRatio; width = w; height = cameraY;
            }
            object.setDisplaySize(width, height).setScrollFactor(0)
            return object
        }

    }

    return { background } 
}


const phaser = {
    get,
    set,
    hexToColor: (hex: string) => Phaser.Display.Color.HexStringToColor(hex).color,
    hexToRGB: (hex: string) => Phaser.Display.Color.IntegerToRGB(phaser.hexToColor(hex)),
    /**Usado para aumentar ou diminuir algum tamanho em porcentagem */
    size: (percent: number, width: number, height: number | null = null) => {
        let w = width * (percent / 100)
        let h = height ? height * (percent / 100) : null
        return { width: w, height: h ?? w }
    },
    camera,
    animate,
    maxWidth: (scene:Scene, width:number, asBoolean?: boolean) => {
        let w = scene.game.config.width as number
        return w > width ? (asBoolean ? true : width) : (asBoolean ? false : w)
    }
}

export default phaser