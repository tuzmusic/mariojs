export function createSpriteLayer(entities, width = 64, height = 64) {
    // set up a buffer on which to pre-draw the sprite
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = width;
    spriteBuffer.height = height;
    const spriteBufferContext = spriteBuffer.getContext('2d');

    return function drawSpriteLayer(layerContext, camera) {
        entities.forEach(entity => {
            // clear the context before we draw
            spriteBufferContext.clearRect(0, 0, width, height);

            // draw the entity to the sprite buffer
            entity.draw(spriteBufferContext);

            // draw the contents of the sprite buffer
            // to the layer.
            layerContext.drawImage(
                spriteBuffer,
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y,
            );
        });
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
    buffer.width = 2048;
    buffer.height = 240;
    const context = buffer.getContext('2d');

    level.tiles.forEach((tile, x, y) => {
        sprites.drawTiles(tile.name, context, x, y);
    });

    // the return function takes a context and draws the buffer
    // (which contains the backgrounds) to it.
    // The return function has closure over the buffer.
    return function drawBackgroundLayer(context, camera) {
        context.drawImage(buffer, -camera.pos.x, -camera.pos.y);
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

    return function drawCollisions(context, camera) {
        // draw collision box around collisions
        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({ x, y }) => {
            context.beginPath();
            context.rect(
                x * tileSize - camera.pos.x,
                y * tileSize - camera.pos.y,
                tileSize,
                tileSize);
            context.stroke();
        });

        // draw collision box around entities
        context.strokeStyle = 'red';
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y,
                entity.size.x,
                entity.size.y);
            context.stroke();
        });
        resolvedTiles = [];
    };
}
