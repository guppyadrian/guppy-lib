import { Canvas } from "./canvas.js";
import { Vector2 } from "./vector2.js";

export class Camera {
    static _x = 0;
    static _y = 0;
    static _z = 1;

    static get x() {
        return Camera._x;
    }
    static set x(x) {
        Camera._x = x;
    }
    static get y() {
        return Camera._y;
    }
    static set y(y) {
        Camera._y = y;
    }
    static get z() {
        return Camera._z;
    }
    static set z(z) {
        Camera._z = z;
    }

    static toScreen(pos: Vector2): Vector2;
    static toScreen(x: number, y: number): Vector2;
    static toScreen(arg1: Vector2 | number, arg2?: number): Vector2 {

        let pos: Vector2;
        if (typeof arg1 === "number" && typeof arg2 === "number") {
            pos = new Vector2(arg1, arg2);
        } else if (arg1 instanceof Vector2) {
            pos = arg1;
        } else {
            throw new Error("Invalid arguments");
        }

        return new Vector2(
            Math.round((pos.x - Camera.x) * Camera.z + Canvas.width / 2),
            Math.round((pos.y - Camera.y) * Camera.z + Canvas.height / 2),
        );

    }

    // (X - C) * Z + W = A
    // X = (A - W) / Z + C

    static toWorld(pos: Vector2) {
        return new Vector2(
            (pos.x - Canvas.width / 2) / Camera.z + Camera.x,
            (pos.y - Canvas.height / 2) / Camera.z + Camera.y,
        )
    }
}

// camera pos should be set