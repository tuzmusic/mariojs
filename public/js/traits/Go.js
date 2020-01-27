import { Trait } from "../Entity.js";

export class Go extends Trait {
    constructor() {
        super('go');
        this.speed = 20;
        this.dir = 0;
    }

    update(entity, deltaTime) {
        let jumping = entity.vel.y > 0;
        if (this.dir === 0 && jumping) {
            entity.vel.x = 0;
        } else {
            entity.vel.x += this.speed * this.dir;
        }
    }
}
