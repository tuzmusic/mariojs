import { loadLevel, } from "./loaders.js";
import { createMario } from "./entities.js";
import Timer from "./Timer.js";
import Keyboard from "./Keyboard.js";
import { createCollisionLayer } from "./layers.js";

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

    // set mario's starting position
    mario.pos.set(64, 80);

    // map key behavior for mario
    const input = new Keyboard();

    // jump
    input.addMapping(' ', mario, 'jump', 'start', 'cancel');

    // gp
    input.addMapping('ArrowLeft', keyState => mario.go.dir = -keyState);
    input.addMapping('ArrowRight', keyState => mario.go.dir = keyState);

    // speed
    input.addMapping('Shift', keyState => mario.go.speed *= 3 ** (keyState ? 1 : -1));

    input.listenTo(window);

    level.comp.layers.push(createCollisionLayer(level));

    // add mario to the level
    level.entities.add(mario);


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

