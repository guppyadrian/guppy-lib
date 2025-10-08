import { Assets } from "./assets.js";
import { Vector2 } from "./vector2.js";
import { Area } from './area.js';
import { Canvas } from "./canvas.js";

export class Sprite extends Area {
    vel;
    image;

    get vx() {
        return this.vel.x;
    }
    set vx(x) {
        this.vel.x = x;
    }

    get vy() {
        return this.vel.y;
    }
    set vy(y) {
        this.vel.y = y;
    }

    static from(filePath: string, x = 0, y = 0) {
        return new this(Assets.get(filePath), x, y);
    }

    constructor(image: HTMLImageElement, x: number, y: number, width?: number, height?: number) {
        super(x, y);
        this.vel = Vector2.zero;
        this.image = image;

        if (width) {
            this.width = width;
        } else {
            this.width = image.width;
        }
        if (height) {
            this.height = height;
        } else {
            this.height = image.height;
        }
    }

    update() {
        this.pos.add(this.vel);
    }

    draw() {
        Canvas.draw(this.image, this.x, this.y);
    }
}