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
    const gravity = 30;

    [ 'mouseup', 'mousemove' ].forEach(name => {
        canvas.addEventListener(name, e => {
            if (e.buttons === 1) {
                mario.vel.set(0, 0);
                mario.pos.set(e.offsetX, e.offsetY);
            }
        });
    });

    function prepareMario() {
        // set mario's starting position
        mario.pos.set(64, 80);

        // map key behavior for mario
        const SPACE = 32;
        const input = new Keyboard();
        input.addMapping(' ', mario, 'jump', 'start', 'cancel');
        input.addMapping('ArrowLeft', mario, 'move', 'left', 'cancel');
        input.addMapping('ArrowRight', mario, 'move', 'right', 'cancel');
        input.listenTo(window);

        // add mario to the level
        level.entities.add(mario);
    }

    function handleTimer() {
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
    }

    prepareMario();

    handleTimer();
});

