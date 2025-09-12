import { Assets } from "./assets.js";
import { Master } from "./master.js";
import { Vector2 } from "./vector2.js";
import { Area } from './area.js';

export class Sprite extends Area {
    vel;
    readonly image;

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

    get center() {
        return new Vector2(this.x + this.width / 2, this.y + this.height / 2);
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
        Master.draw(this.image, this.x, this.y);
    }
}