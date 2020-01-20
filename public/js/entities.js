import Entity from "./Entity.js";
import { loadMarioSprite } from "./sprites.js";

export async function createMario() {
    return loadMarioSprite().then(sprite => {
        const mario = new Entity();
        mario.pos.set(64, 180);
        mario.vel.set(2, -10);

        /*
        * Define some functions for Mario here. Not in its own class/instance
        * because here we have gravity, marioSprite, etc, in context.
        */
        mario.draw = function (context) {
            sprite.draw('idle', context, this.pos.x, this.pos.y);
        };

        mario.update = function () {
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
        };

        return mario;
    });
}
