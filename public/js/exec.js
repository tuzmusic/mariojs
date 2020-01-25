import { loadLevel, } from "./loaders.js";
import { createMario } from "./entities.js";
import Timer from "./Timer.js";
import Keyboard from "./Keyboard.js";

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(), // creates and yields the mario object
    loadLevel('1-1')
]).then(([ mario, level ]) => {


    // set some values on the mario entity we got in the promise chain
    const gravity = 30;
    mario.pos.set(64, 80);
    level.entities.add(mario);
    const SPACE = 32;
    const input = new Keyboard();
    input.addMapping(SPACE, mario, 'jump', 'start', 'cancel');
    input.listenTo(window);

    const timer = new Timer(1 / 60);

    // define the timer's update function, where we have access to mario, and the context, etc.
    timer.update = function update(deltaTime) {
        // draw all layers in the compositor by calling all of their draw functions in the context.
        level.comp.draw(context);

        // update mario's position
        level.update(deltaTime);

        // update mario's velocity for the next update.
        // y-vel starts negative, so mario moves up (slowing down) until vel = 0, then moves down.
        mario.vel.y += gravity;
    };

    // and start the timer
    timer.start();
});

