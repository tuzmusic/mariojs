import { Trait } from "../Entity.js";

export class Go extends Trait {
    constructor() {
        super('go');
        this.velocity = 10;
        this.dir = 0;
    }

    update(entity, deltaTime) {
        let jumping = entity.vel.y > 0;
        if (this.dir === 0 && jumping) {
            entity.vel.x = 0;
        } else {
            entity.vel.x += this.velocity * this.dir;
        }
    }

    left(keyState) {
        this.dir = -keyState;
        console.log(this.dir);
    }

    right(keyState) {
        this.dir = keyState;
    }

    cancel() {
        this.dir = 0;
    }

}
