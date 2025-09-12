export class Keyboard {
    private static keys = new Map<string, boolean>();
    private static initialized = false;

    static initialize() {
        if (Keyboard.initialized) return;
        Keyboard.initialized = true;

        window.addEventListener("keydown", e => {
            Keyboard.handleKey(e, true);
        });
        window.addEventListener("keyup", e => {
            Keyboard.handleKey(e, false);
        });
    }

    private static handleKey(event: KeyboardEvent, isDown: boolean) {
        Keyboard.keys.set(event.code, isDown);
    }

    static isDown(key: string) {
        return Keyboard.keys.get(key) || false;
    }

    static isUp(key: string) {
        return !Keyboard.keys.get(key);
    }
}