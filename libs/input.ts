import { Keyboard } from "./keyboard.js";

export class Input {
    private static initialized = false;
    private static keyBinds = new Map<string, string[]>();

    static initialize() {
        Keyboard.initialize();

        if (Input.initialized) return;
        Input.initialized = true;
    }

    static addBind(name: string, keys: string[]) {
        this.keyBinds.set(name, keys);
    }

    static get(name: string) {
        const inputs = Input.keyBinds.get(name); // array of keycodes
        if (!inputs) return false;

        for (const key of inputs) {
            if (Keyboard.isDown(key)) {
                return true;
            }
        }
        return false;
    }
}