import { Camera } from "./camera.js";
import { Canvas } from "./canvas.js";
import type { Scene } from "./scene.js";

export class Master {
    static initialized = false;
    static currentScene: Scene;
    static canvas = Canvas;

    // TODO: make error checking for these stuff
    static get width() {
        return this.canvas.width; // TODO: make sure this is still accurate with zoom (probably not???)
    }
    static get height() {
        return this.canvas.height;
    }

    static initialize(canvas: HTMLCanvasElement) {
        if (Master.initialized) return;
        Master.initialized = true;

        Master.canvas.initialize(canvas);
    }

    static changeScene(newScene: Scene) {
        if (Master.currentScene) {
            Master.currentScene.destroy();
        }
        Master.currentScene = newScene;
        newScene.initialize();
    }

    // TODO: this conflicts with a draw loop for Master. like the name does. I would like master to have draw() and update() loops, but I have to directly call currentScene.draw()
    static draw(image: HTMLImageElement, x: number, y: number) {
        const drawPos = Camera.toScreen(x, y);
        Master.canvas.draw(image, drawPos.x, drawPos.y, 1, 0);
    }

    static update() {
        Master.currentScene.update();
    }

    // a combined update/draw
    static tick() {
        Master.update();
        Master.canvas.clear();
        Master.currentScene.draw();
    }
}