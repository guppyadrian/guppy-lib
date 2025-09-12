import { Vector2 } from "./vector2.js";

export class Area {
    pos;
    size;

    get x() {
        return this.pos.x;
    }
    set x(x) {
        this.pos.x = x;
    }

    get y() {
        return this.pos.y;
    }
    set y(y) {
        this.pos.y = y;
    }

    get width() {
        return this.size.x;
    }
    set width(w) {
        this.size.x = w;
    }

    get height() {
        return this.size.y;
    }
    set height(h) {
        this.size.y = h;
    }

    get top() { return this.y; }
    get bottom() { return this.y + this.height; }
    get left() { return this.x; }
    get right() { return this.x + this.width; }

    constructor(x = 0, y = 0, width = 30, height = 30) {
        this.pos = new Vector2(x, y);
        this.size = new Vector2(width, height);
    }

    colliding(otherArea: Area) {
        if (this.right <= otherArea.left) return false;
        if (this.left >= otherArea.right) return false;
        if (this.bottom <= otherArea.top) return false;
        if (this.top >= otherArea.bottom) return false;
        return true;
    }
}