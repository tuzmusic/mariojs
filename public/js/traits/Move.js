import { Trait } from "../Entity.js";

export class Move extends Trait {
    constructor() {
        super('move');
        this.velocity = 10;
        this.direction = 0;
    }

    update(entity, deltaTime) {
        let jumping = entity.vel.y >= 0;
        if (this.direction === 0 && jumping) {
            entity.vel.x = 0;
        } else {
            entity.vel.x += this.velocity * this.direction;
        }
    }

    left() {
        this.direction = -1;
    }

    right() {
        this.direction = 1;
    }

    cancel() {
        this.direction = 0;
    }

}
