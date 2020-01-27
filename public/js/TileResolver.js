export class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    // tiles are squares so this can be used with x or y coords
    toIndex(pos) {
        return Math.floor(pos / this.tileSize);
    }

    /**
     * @returns an array of the tiles in a given position range {[]}
     */
    toIndexRange(pos1, pos2) {
        // get highest position to search
        const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
        const range = [];
        // start at pos1
        let pos = pos1;
        do {
            // add the tile at this position to our range
            range.push(this.toIndex(pos));
            pos += this.tileSize; // move to the next tile
        } while (pos < pMax);
        return range;
        // from pos1.x to pos2.x
        // from pos1.y to pos2.y
        // convert to indexes
        // match by position
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
    searchByPosition(x, y) {
        return this.getByIndex(this.toIndex(x), this.toIndex(y));
    }

    searchByRange(x1, x2, y1, y2) {
        const matches = [];
        // search all tiles in the range for collisions
        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);
                if (match) matches.push(match);
            });
        });
        return matches;
    }
}
