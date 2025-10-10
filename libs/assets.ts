export class Assets {
    static readonly lib = new Map<string, HTMLImageElement>();

    static get(name: string) {
        if (!Assets.has(name)) {
            throw new Error("Error: could not find asset by name: " + name);
        }
        const asset = Assets.lib.get(name);
        if (!asset) throw new Error("this shouldn't happen! Could not find asset that exists: " + name);
        return asset;
    }

    static has(name: string) {
        return Assets.lib.has(name);
    }

    static load(filePath: string, name: string) {
        if (Assets.has(name)) return Promise.resolve();

        const image = new Image();
        image.src = filePath;
        Assets.lib.set(name || filePath, image); 

        return new Promise<void>((resolve, reject) => {
            image.onload = () => resolve();
        });
    }
}