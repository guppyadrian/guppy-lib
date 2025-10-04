import { Assets } from "./assets.js";
import { Camera } from "./camera.js";

export class Canvas {
    static canvas: HTMLCanvasElement;
    static ctx: CanvasRenderingContext2D;
    static initialized = false;

    static patterns = new Map<string, CanvasPattern>();
    
    static initialize(canvas: HTMLCanvasElement) {
        if (Canvas.initialized) return;
        Canvas.initialized = true;

        Canvas.canvas = canvas;

        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error("Failed to get 2D context from canvas");
        }
        Canvas.ctx = context;
        Canvas.ctx.imageSmoothingEnabled = false;
    }

    /**
     * Creates a CanvasPattern for repeating textures. Takes the name of an asset as input
     * @param name 
     * @returns
     */
    static getPattern(name: string) {
        const asset = Assets.get(name);
        if (!asset) throw new Error("Can't find asset with name: " + name);

        const pattern = Canvas.patterns.get(name);

        if (!pattern) {
            const pattern = Canvas.ctx.createPattern(asset, "repeat");
            if (!pattern) throw new Error("Failed to create CanvasPattern with name: " + name);

            Canvas.patterns.set(name, pattern);

            return pattern;
        }

        return pattern;
    }


    static get width() {
        return Canvas.canvas.width;
    }
    static set width(w) {
        Canvas.canvas.width = w;
    }

    static get height() {
        return Canvas.canvas.height;
    }
    static set height(h) {
        Canvas.canvas.height = h;
    }

    static fullscreen() {
        Canvas.width = window.innerWidth;
        Canvas.height = window.innerHeight;
        Canvas.ctx.imageSmoothingEnabled = false;
    }

    static draw(image: HTMLImageElement, x: number, y: number, scale: number = 1, rotation: number = 0) {
        // TODO: implement rotation
        const screenPos = Camera.toScreen(x, y);
        const sizeX = image.width * scale * Camera.z;
        const sizeY = image.height * scale * Camera.z;

        if (screenPos.x > Canvas.width) return;
        if (screenPos.y > Canvas.height) return;

        Canvas.ctx.drawImage(
            image,
            screenPos.x,
            screenPos.y,
            sizeX,
            sizeY,
        );
    }

    static setAlpha(alpha = 1) {
        Canvas.ctx.globalAlpha = alpha;
    }

    // TODO: if no name is given, just repeat last pattern
    static drawPattern(x: number, y: number, w: number, h: number, name: string) {
        const pattern = Canvas.getPattern(name);

        pattern.setTransform(new DOMMatrix().translate(Canvas.width / 2, Canvas.height / 2).scale(Camera.z).translate(x - Camera.x, y - Camera.y));
        
        Canvas.ctx.fillStyle = pattern;

        this.drawRect(x, y, w, h);
    }

    static drawRect(x: number, y: number, w: number, h: number) {
        //Canvas.ctx.imageSmoothingEnabled = false;
        const screenPos = Camera.toScreen(x, y);
        Canvas.ctx.fillRect(
            screenPos.x,
            screenPos.y,
            w * Camera.z,
            h * Camera.z,
        )
    }

    static drawText() {
        // TODO: implement
    }
    // TODO: Store ctx patterns

    static clear() {
        Canvas.ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    }
}