import { TileResolver } from "./TileResolver.js";

export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }

    checkY(entity) {
        const match = this.tiles.matchByPosition(entity.pos.x, entity.pos.y);
        if (!match) return;

        if (match.tile.name !== 'ground') return;

        if (entity.isMovingDown) {
            if (entity.isAboveTopOf(match)) {
                entity.pos.y = match.y1;
                entity.vel.y = 0;
            }
        } else if (entity.isMovingUp) {
            if (entity.pos.y < match.y2) {
                entity.pos.y = match.y2;
                entity.vel.y = 0;
            }
        }
    }

    test(entity) {
        this.checkY(entity);
    }
}
