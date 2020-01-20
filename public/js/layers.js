/**
 * @param background The background object
 * @param context The context in which to draw
 * @param sprites The spritesheet in use
 */
function drawBackground(background, context, sprites) {
    background.ranges.forEach(([ x1, x2, y1, y2 ]) => {
        for (let x = x1; x < x2; x++) {
            for (let y = y1; y < y2; y++) {
                sprites.drawTiles(background.tile, context, x, y);
            }
        }
    });
}

/**
 * Returns a function that draws the layers onto a given context.
 * @param backgrounds The info for the backgrounds to draw.
 * @param sprites The sprites from which the backgrounds will be created.
 * @returns {drawBackgroundLayer}
 */
export function createBackgroundLayer(backgrounds, sprites) {
    // create a buffer on which to pre-draw the backgrounds
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;

    // draw each background to the buffer using the sprites
    backgrounds.forEach(background => {
        drawBackground(background, buffer.getContext('2d'), sprites);
    });

    // the return function takes a context and draws the buffer
    // (which contains the backgrounds) to it.
    // The return function has closure over the buffer.
    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    };
}
