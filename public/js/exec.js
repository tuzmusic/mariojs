import { loadLevel, } from "./loaders.js";
import { loadBackgroundSprites } from "./sprites.js";
import { Compositor } from "./Compositor.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import { createMario } from "./entities.js";
import Timer from "./Timer.js";
import Keyboard from "./KeyboardState.js";

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(), // creates and yields the mario object
    loadBackgroundSprites(),
    loadLevel('1-1')
]).then(([ mario, backgroundSprites, level ]) => {
    // create layer drawing functions and add them to the compositor
    const comp = new Compositor();

    // create the background layer
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);

    // set some values on the mario entity we got in the promise chain
    const gravity = 30;
    mario.pos.set(64, 180);
    mario.vel.set(200, -600);

    const SPACE = 32;
    const input = new Keyboard();
    input.addMapping(SPACE, keyState => keyState ? mario.jump.start() : mario.jump.cancel());
    input.addMapping(SPACE, keyState =>
        mario.jump[keyState ? 'start' : 'cancel']()
    );
    input.listenTo(window);

    // create the mario sprite.
    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    const timer = new Timer(1 / 60);

    // define the timer's update function, where we have access to mario, and the context, etc.
    timer.update = function update(deltaTime) {
        // draw all layers in the compositor by calling all of their draw functions in the context.
        comp.draw(context);

        // update mario's position
        mario.update(deltaTime);

        // update mario's velocity for the next update.
        // y-vel starts negative, so mario moves up (slowing down) until vel = 0, then moves down.
        mario.vel.y += gravity;
    };

    // and start the timer
    timer.start();
});

