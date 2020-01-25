import { Trait } from "../Entity.js";

export class Jump extends Trait {
    constructor() {
        super('jump');
        this.duration = 0.5;
        this.velocity = 200;
        this.engageTime = 0;
    }

    update(entity, deltaTime) {
        // if the jump is engaged
        if (this.engageTime > 0) {
            // make mario go up! (or down)
            entity.vel.y = -this.velocity;
            // run the clock on the jump
            this.engageTime -= deltaTime;
        }
    }

    start() {
        console.log('start jump');
        // start the clock
        this.engageTime = this.duration;
    }

    cancel() {
        console.log('cancel jump');
        this.engageTime = 0;
    }

}
