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


export function createCollisionLayer(level) {
    let resolvedTiles = [];

    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({ x, y });
        return getByIndexOriginal.call(tileResolver, x, y);
    };

    return function drawCollisions(context) {
        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({ x, y }) => {
            context.beginPath();
            context.rect(x * tileSize, y * tileSize, tileSize, tileSize);
            context.stroke();
        });
        resolvedTiles = [];
    };
}
