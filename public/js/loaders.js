import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import Level from "./Level.js";
import { loadBackgroundSprites } from "./sprites.js";

export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.src = url;
    });
}

export function loadLevel(name) {
    return Promise.all([
        fetch(`/levels/${ name }.json`).then(res => res.json()),
        loadBackgroundSprites()
    ]).then(([ levelSpec, backgroundSprites ]) => {
        const level = new Level();

        // create the background layer
        const backgroundLayer = createBackgroundLayer(levelSpec.backgrounds, backgroundSprites);
        level.comp.layers.push(backgroundLayer);

        // create the sprites for the entities in the level.
        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        return level;
    });
}

