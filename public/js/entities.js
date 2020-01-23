import Entity from "./Entity.js";
import { loadMarioSprite } from "./sprites.js";

export async function createMario() {
    const sprite = await loadMarioSprite(); // get the sprite BEFORE we do anything else

    // create mario and set basic properties
    const mario = new Entity();

    // Add some functions to the mario entity.

    // Draws mario in the context
    mario.draw = function (context) {
        sprite.draw('idle', context, this.pos.x, this.pos.y);
    };

    // Update mario's position.
    // Called in the parent update function so that
    // Mario is drawn at new position on next frame.
    mario.update = function (deltaTime) {
        this.pos.x += this.vel.x * deltaTime;
        this.pos.y += this.vel.y * deltaTime;
    };

    return mario;
}
