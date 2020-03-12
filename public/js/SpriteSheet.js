export default class SpriteSheet {
    /**
     * @param image The full sprite image
     * @param width The width of each tile
     * @param height The height of each tile
     */
    constructor(image, width, height) {
        this.image = image;
        this.height = height;
        this.width = width;
        this.tiles = new Map();
    }

    /**
     * Defines a named tile by getting its slice from the spritesheet.
     * @param name The name of the tile.
     * @param x The x-coordinate (drawing domain) in the spritesheet
     * @param y The y-coordinate (drawing domain) in the spritesheet
     */
    define(name, x, y, width = 16, height = 16) {
        const { image, } = this;
        const buffer = document.createElement('canvas');
        buffer.width = width;
        buffer.height = height;
        buffer.getContext('2d').drawImage(
            image,
            x,
            y,
            width,
            height, // what part of the image to draw
            0, 0, width, height); // where to draw it
        this.tiles.set(name, buffer); // store the info about the tile in our map
    }

    /**
     * Defines a named tile by getting its slice from the spritesheet.
     * @param name The name of the tile.
     * @param x The x-coordinate (tiles domain) in the spritesheet
     * @param y The y-coordinate (tiles domain) in the spritesheet
     */
    defineTile(name, x, y) {
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }

    /**
     * Draws a given tile from the spritesheet at a given location
     * @param name The mapped name of the tile to draw
     * @param context The context in which to draw the tile
     * @param x The location of the tile (x)
     * @param y The location of the tile (y)
     */
    draw(name, context, x, y) {
        const tile = this.tiles.get(name);
        context.drawImage(tile, x, y);
    }

    /**
     * Draws a tile at given location, taking into account the tile size of the sprite sheet.
     * @param name The mapped name of the tile to draw
     * @param context The context in which to draw the tile
     * @param x The location of the tile (x)
     * @param y The location of the tile (y)
     */
    drawTiles(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}
