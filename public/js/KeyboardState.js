const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        this.keyStates = new Map(); // the pressed/unpressed state of each key
        this.keyMap = new Map(); // the action mapped to each key
    }

    addMapping = (keyCode, callBack) => this.keyMap.set(keyCode, callBack);

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
