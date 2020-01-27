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
        this.size = new Vec2();
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

    get isMovingUp() { return this.vel.y < 0; }

    get isMovingDown() { return this.vel.y > 0; }

    get isMovingLeft() { return this.vel.x > 0; }

    get isMovingRight() { return this.vel.x < 0; }

    hitsTopOf(tile) { return (this.pos.y + this.size.y) > tile.y1; }

    hitsBottomOf(tile) { return this.pos.y < tile.y2; }

    hitsLeftOf(tile) { return (this.pos.x + this.size.x) > tile.x1; }

    hitsRightOf(tile) { return this.pos.x < tile.x2;}
}
