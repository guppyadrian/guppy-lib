import type { Area } from "./area.js";
import { Mouse } from "./mouse.js";
import { Button } from "./ui/button.js";

export abstract class Scene {
    buttons: [Area, Function][] = [];

    constructor() { }

    static preload() {
        return new Promise<void>(r => r());
    }

    initialize() { }

    abstract update(): void;

    abstract draw(): void;

    destroy() { }

    addButton(image: HTMLImageElement, x: number, y: number, callback?: Function) {
        const btn = new Button(image, x, y, callback);
        this.buttons.push([btn, btn.callback]);

        return btn;
    }
}