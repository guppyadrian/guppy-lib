import { Mouse } from "../mouse.js";
import { Sprite } from "../sprite.js";

export class Button extends Sprite {
    callback;
    constructor(image: HTMLImageElement, x: number, y: number, callback?: Function) {
        super(image, x, y);

        if (callback === undefined) {
            this.callback = () => {console.log("undefined callback!")};
        } else {
            this.callback = callback;
        }
        

        Mouse.addButton(this, this.callback);
    }
}