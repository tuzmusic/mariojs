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

function createTiles(level, backgrounds) {
    function applyRange(background, xStart, xLen, yStart, yLen) {
        const xEnd = xStart + xLen;
        const yEnd = yStart + yLen;
        for (let x = xStart; x < xEnd; x++) {
            for (let y = yStart; y < yEnd; y++) {
                level.tiles.set(x, y, {
                    name: background.tile
                });
            }
        }
    }

    backgrounds.forEach(background => {
        background.ranges.forEach(args => {
            if (args.length === 4) {
                const [ xStart, xLen, yStart, yLen ] = args;
                applyRange(background, xStart, xLen, yStart, yLen);
            } else if (args.length === 3) {
                const [ xStart, xLen, yStart ] = args;
                applyRange(background, xStart, xLen, yStart, 1);
            } else if (args.length === 2) {
                const [ xStart, yStart ] = args;
                applyRange(background, xStart, 1, yStart, 1);
            }
        });
    });
}

export function loadLevel(name) {
    return Promise.all([
        fetch(`/levels/${ name }.json`).then(res => res.json()),
        loadBackgroundSprites()
    ]).then(([ levelSpec, backgroundSprites ]) => {
        const level = new Level();

        createTiles(level, levelSpec.backgrounds);

        // create the background layer
        const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
        level.comp.layers.push(backgroundLayer);

        // create the sprites for the entities in the level.
        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        console.log(level);

        return level;
    });
}

