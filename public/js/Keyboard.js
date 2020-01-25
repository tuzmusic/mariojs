const PRESSED = 1;
const RELEASED = 0;

export default class Keyboard {
    constructor() {
        this.keyStates = new Map(); // the pressed/unpressed state of each key
        this.keyMap = new Map(); // the action mapped to each key
    }

    _addMapping = (keyCode, callBack) => {
        return this.keyMap.set(keyCode, callBack);
    };

    addMapping = (...args) => {
        // handle normal add mapping (keyCode, callback)
        if (args[1] instanceof Function) {
            this._addMapping(...args);
        } else if (args.slice(2).every(arg => typeof arg === 'string')) {
            const [ keyCode, entity, trait, start, stop ] = args;
            const callback = keyState => {
                entity[trait][keyState ? start : stop]();
            };
            this._addMapping(keyCode, callback);
        }
    };

    handleEvent = (event) => {
        const { keyCode } = event;
        if (!this.keyMap.has(keyCode)) return;

        event.preventDefault();

        // get the keystate
        const keyState = (event.type === 'keydown') ? PRESSED : RELEASED;

        if (keyState === this.keyStates.get(keyCode)) return;

        // store the keystate if it has changed
        this.keyStates.set(keyCode, keyState);
        // run the callback
        this.keyMap.get(keyCode)(keyState);
    };

    listenTo = (window) => {
        [ 'keydown', 'keyup' ].forEach(eventName => {
            window.addEventListener(eventName, event => this.handleEvent(event));
        });
    };
}
