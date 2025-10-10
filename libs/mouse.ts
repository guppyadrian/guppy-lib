import { Area } from "./area.js";
import { Camera } from "./camera.js";
import { Master } from "./master.js";
import type { Button } from "./ui/button.js";
import { Vector2 } from "./vector2.js";

export class Mouse {
    private static initialized = false;
    private static pressPos = Vector2.zero;
    private static pressed = false;

    static get buttons() {
        return Master.currentScene.buttons;
    }

    static initialize() {
        if (Mouse.initialized) return;
        Mouse.initialized = true;

        window.addEventListener('mousedown', e => {
            Mouse.handlePress(e, true);
        });

        window.addEventListener('mouseup', e => {
            Mouse.handlePress(e, false);
        });

        // TODO: implement this for hover effects
        window.addEventListener('mousemove', e => {

        });
    }

    static handlePress(e: MouseEvent, isDown: boolean) {
        if (isDown) {
            Mouse.pressPos.x = e.clientX;
            Mouse.pressPos.y = e.clientY;
            Mouse.pressed = true; 
        } else {
            Mouse.pressed = false;
            const releasePos = new Vector2(e.clientX, e.clientY);

            Mouse.checkPresses(releasePos);
        }
    }

    static isPressed() {
        return Mouse.pressed;
    }

    static checkPresses(releasePos: Vector2) {
        for (const btn of Mouse.buttons) {
            if (!btn[0].collidingPoint(Mouse.pressPos)) continue;

            btn[1]();
        }
    }

    static clearButtons() {
        Mouse.buttons.length = 0;
    }
}