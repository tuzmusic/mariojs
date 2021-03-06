import Entity from "./Entity.js";
import { loadMarioSprite } from "./sprites.js";
import { Jump } from "./traits/Jump.js";
import { Go } from "./traits/Go.js";

export async function createMario() {
    const sprite = await loadMarioSprite(); // get the sprite BEFORE we do anything else

    // create mario and set basic properties
    const mario = new Entity();
    mario.size.set(14, 16);

    mario.addTrait(new Go());
    mario.addTrait(new Jump());
    // mario.addTrait(new Velocity());

    // Add some functions to the mario entity.

    // Draws mario in the context
    mario.draw = function (context) {
        sprite.draw('idle', context, 0, 0);
    };

    return mario;
}
