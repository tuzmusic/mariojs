import { Vec2 } from "./Math.js";

export class Trait {
    constructor(NAME) {
        this.NAME = NAME;
    }

    update() {
        console.warn(NAME, 'trait has not implemented update method');
    }
}

export default class Entity {
    constructor() {
        this.pos = new Vec2();
        this.vel = new Vec2();
        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    // on every frame, invoke all the entity's traits
    update(deltaTime) {
        this.traits.forEach(trait => trait.update(this, deltaTime));
    }
}
