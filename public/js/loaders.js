import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import Level from "./Level.js";
import SpriteSheet from "./SpriteSheet.js";

const loadJSON = (url) => fetch(url).then(res => res.json());

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
                const name = background.tile;
                // store the positions of these tiles
                // in our level's tile map
                level.tiles.set(x, y, { name });
            }
        }
    }

    // read from the spec to write all the tile locations for the level
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

function loadSpriteSheet(name) {
    // get the spritesheet info, so we get the imageURL it uses
    return loadJSON(`/sprites/${ name }.json`)
        // now that we have the url for the image, load it and pass
        // it on with the rest of the info about the level
        .then(sheetSpec => Promise.all([
            sheetSpec,
            loadImage(sheetSpec.imageURL)
        ]))
        .then(([ sheetSpec, image ]) => {
            // create the sprite objects from the spritesheet info,
            // using the spritesheet image
            const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH);

            // use the info for the tiles from the spec to
            // populate the [name: tile] map
            sheetSpec.tiles.forEach(tile => {
                sprites.defineTile(tile.name, ...tile.index);
            });

            return sprites;
        });
}

export function loadLevel(name) {
    // get the level info, so we get the spritesheet it needs
    return loadJSON(`/levels/${ name }.json`)
        // now that we have the spritesheet, load it and pass
        // it on with the rest of the info about the level
        .then(levelSpec => Promise.all([
            levelSpec,
            loadSpriteSheet(levelSpec.spriteSheet)
        ]))
        .then(([ levelSpec, backgroundSprites ]) => {
            const level = new Level();

            // store the tile info in the level object
            createTiles(level, levelSpec.backgrounds);

            // create the background layer based on the above info,
            // using the sprites for the level.
            const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
            level.comp.layers.push(backgroundLayer);

            // create the sprites for the entities in the level.
            const spriteLayer = createSpriteLayer(level.entities);
            level.comp.layers.push(spriteLayer);

            return level;
        });
}

