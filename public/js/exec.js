import { loadLevel, } from "./loaders.js";
import { loadBackgroundSprites } from "./sprites.js";
import { Compositor } from "./Compositor.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import { createMario } from "./entities.js";

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(), // creates and yields the mario object
    loadBackgroundSprites(),
    loadLevel('1-1')
]).then(([ mario, backgroundSprites, level ]) => {
    // create layer drawing functions and add them to the compositor
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(backgroundLayer);
    comp.layers.push(spriteLayer);
√
    const gravity = 0.5;

    function update() {
        // draw all layers in the compositor by calling
        // all of their draw functions in the context.
        comp.draw(context);

        // y-vel starts negative, so mario moves up (slowing down) until vel = 0, then moves down.
        mario.vel.y += gravity;

        mario.update();
        requestAnimationFrame(update);
    }

    update();
});

