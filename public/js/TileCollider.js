import { TileResolver } from "./TileResolver.js";

export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }

    checkY(entity) {
        const matches = this.tiles.searchByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            entity.pos.y, entity.pos.y + entity.size.y
        );

        matches.forEach(match => {
            if (match.tile.name !== 'ground') return;

            if (entity.isMovingDown) {
                if (entity.isAboveTopOf(match)) {
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;
                }
            } else if (entity.isMovingUp) {
                if (entity.isBelowBottomOf(match)) {
                    entity.pos.y = match.y2;
                    entity.vel.y = 0;
                }
            }
        });
    }

    test(entity) {
        this.checkY(entity);
    }
}
