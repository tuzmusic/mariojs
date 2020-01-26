export class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    // tiles are squares so this can be used with x or y coords
    toIndex(pos) {
        return Math.floor(pos / this.tileSize);
    }

    // gets a tile using indices
    getByIndex(x, y) {
        const tile = this.matrix.get(x, y);
        if (tile) {
            const y1 = y * this.tileSize;
            const y2 = y1 + this.tileSize;
            return { tile, y1, y2 };
        }
    }

    // gets a tile using actual positions
    matchByPosition(x, y) {
        return this.getByIndex(this.toIndex(x), this.toIndex(y));
    }
}
