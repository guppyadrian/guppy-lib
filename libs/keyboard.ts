export class Keyboard {
    private static keys = new Map<string, boolean>();
    private static keysJustPressed = new Map<string, boolean>();
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
        if (isDown) {
            Keyboard.keysJustPressed.set(event.code, true);
        }
    }

    static isDown(key: string) {
        return Keyboard.keys.get(key) || false;
    }

    static isJustDown(key: string) {
        if (Keyboard.keysJustPressed.get(key)) {
            Keyboard.keysJustPressed.set(key, false);
            return true;
        }
        return false;
    }

    static isUp(key: string) {
        return !Keyboard.keys.get(key);
    }

    static update() {
        
    }
}