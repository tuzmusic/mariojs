export function createSpriteLayer(entities) {
    return function drawSpriteLayer(context) {
        entities.forEach(entity => entity.draw(context));
    };
}

/**
 * Returns a function that draws the layers onto a given context.
 * @param backgrounds The info for the backgrounds to draw.
 * @param sprites The sprites from which the backgrounds will be created.
 * @returns {drawBackgroundLayer}
 */
export function createBackgroundLayer(level, sprites) {
    // create a buffer on which to pre-draw the backgrounds
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;
    const context = buffer.getContext('2d');

    level.tiles.forEach((tile, x, y) => {
        sprites.drawTiles(tile.name, context, x, y);
    });

    // the return function takes a context and draws the buffer
    // (which contains the backgrounds) to it.
    // The return function has closure over the buffer.
    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    };
}
