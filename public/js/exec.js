import { loadLevel, } from "./loaders.js";
import { loadBackgroundSprites, loadMarioSprite } from "./sprites.js";
import { Compositor } from "./Compositor.js";
import { createBackgroundLayer } from "./layers.js";

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        sprite.draw('idle', context, pos.x, pos.y);
    };
}

export default function go() {
// loads the sprites and loads the level info, and when those are done,
// it draws the backgrounds for the level, using the loaded sprirtes.
    Promise.all([
        loadBackgroundSprites(),
        loadMarioSprite(),
        loadLevel('1-1')
    ]).then(([ backgroundSprites, marioSprite, level ]) => {
        const comp = new Compositor();
        const gravity = 0.5;

        const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
        comp.layers.push(backgroundLayer);

        const pos = { x: 64, y: 180 };
        const vel = { x: 2, y: -10 };

        const spriteLayer = createSpriteLayer(marioSprite, pos);
        comp.layers.push(spriteLayer);

        function update() {
            comp.draw(context);
            pos.x += vel.x;
            pos.y += vel.y;
            vel.y += gravity; // y-vel starts negative, so mario moves up (slowing down) until vel = 0, then moves down.
            requestAnimationFrame(update);
        }

        update();
    });
}
