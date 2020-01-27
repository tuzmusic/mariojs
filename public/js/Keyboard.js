import Entity from "./Entity.js";

const PRESSED = 1;
const RELEASED = 0;

export default class Keyboard {
    constructor() {
        this.keyStates = new Map(); // the pressed/unpressed state of each key
        this.keyMap = new Map(); // the action mapped to each key
    }

    addMapping = (...args) => {
        let callback;
        const keyCode = args.shift();
        const next = args.shift();

        // allow for normal event listening
        if (next instanceof Function) callback = next;

        // allow an entity, trait name, and start and stop method names.
        else if (next instanceof Entity) {
            const entity = next;
            const [ trait, start, stop ] = args;
            callback = keyState => entity[trait][keyState ? start : stop](keyState);
        }
        this.keyMap.set(keyCode, callback);
    };

    handleEvent = (event) => {
        const { key } = event;
        if (!this.keyMap.has(key)) return;

        event.preventDefault();

        // get the keystate
        const keyState = (event.type === 'keydown') ? PRESSED : RELEASED;

        if (keyState === this.keyStates.get(key)) return;

        // store the keystate if it has changed
        this.keyStates.set(key, keyState);
        // run the callback
        this.keyMap.get(key)(keyState);
    };

    listenTo = (window) => {
        [ 'keydown', 'keyup' ].forEach(eventName => {
            window.addEventListener(eventName, event => this.handleEvent(event));
        });
    };
}
