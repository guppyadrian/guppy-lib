import { Camera } from "../camera.js";
import { Mouse } from "../mouse.js";
import { Sprite } from "../sprite.js";
import type { Vector2 } from "../vector2.js";

export class Button extends Sprite {
    callback;
    gui = false;
    constructor(image: HTMLImageElement, x: number, y: number, callback?: Function) {
        super(image, x, y);

        if (callback === undefined) {
            this.callback = () => {console.log("undefined callback!")};
        } else {
            this.callback = callback;
        }
    }

    collidingPoint(point: Vector2): boolean {
        if (this.gui) {
            return super.collidingPoint(point);
        }

        const worldPoint = Camera.toWorld(point);

        
        return super.collidingPoint(worldPoint);
    }
}