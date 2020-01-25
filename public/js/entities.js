import Entity from "./Entity.js";
import { loadMarioSprite } from "./sprites.js";
import { Velocity } from "./traits/Velocity.js";

export async function createMario() {
    const sprite = await loadMarioSprite(); // get the sprite BEFORE we do anything else

    // create mario and set basic properties
    const mario = new Entity();

    mario.addTrait(new Velocity());

    // Add some functions to the mario entity.

    // Draws mario in the context
    mario.draw = function (context) {
        sprite.draw('idle', context, this.pos.x, this.pos.y);
    };

    return mario;
}
