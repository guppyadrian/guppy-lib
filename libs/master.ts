import { Camera } from "./camera.js";
import { Canvas } from "./canvas.js";
import type { Scene } from "./scene.js";

//let ticker = 0;

export class Master {
    static initialized = false;
    static currentScene: Scene;
    static canvas = Canvas;

    // stuff for ticks
    static lastTick: number;
    static tickTime: number;
    static tickAcc: number = 0; // accumulates ms and if > (1000 / tps) then run a tick
    static tps: number;
    static started = false;

    // TODO: make error checking for these stuff
    static get width() {
        return this.canvas.width; // TODO: make sure this is still accurate with zoom (probably not???)
    }
    static get height() {
        return this.canvas.height;
    }

    static initialize(canvas: HTMLCanvasElement, tps: number) {
        if (Master.initialized) return;
        Master.initialized = true;

        Master.tickTime = 1000 / tps;
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

    static start() {
        requestAnimationFrame(Master.tick);
    }

    static update() {
        Master.currentScene.update();
    }

    // a combined update/draw
    static tick(timestamp: number) {

        if (!Master.started) {
            Master.started = true;
            Master.lastTick = timestamp;
            requestAnimationFrame(Master.tick);
            return;
        }

        // if (++ticker % 1 !== 0) {
        //     requestAnimationFrame(Master.tick);
        //     return;
        // }

        Master.tickAcc += timestamp - Master.lastTick;
        Master.lastTick = timestamp;
        const ticks = Math.floor(Master.tickAcc / Master.tickTime);
        Master.tickAcc = Master.tickAcc % Master.tickTime;

        for (let i = 0; i < ticks; i++) {
            Master.update();
        }
        Master.canvas.clear();
        Master.currentScene.draw();

        requestAnimationFrame(Master.tick);
    }
}