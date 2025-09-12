export abstract class Scene {

    constructor() { }

    static preload() {
        return new Promise<void>(r => r());
    }

    initialize() { }

    abstract update(): void;

    abstract draw(): void;

    destroy() { }
}