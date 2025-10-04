export class Vector2 {
    x;
    y;
    
    /**
     * Returns a zero vector
     */
    static get zero() {
        return new this(0, 0);
    }

    static add(vec1: Vector2, vec2: Vector2) {
        return new Vector2(vec1.x + vec2.x, vec1.y + vec2.y);
    }
    
    /**
     * Add's another vector to this vector
     */
    add(otherVec: Vector2) {
        this.x += otherVec.x;
        this.y += otherVec.y;
    }

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y; 
    }
}