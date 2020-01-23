export default class Timer {
    constructor(deltaTime = 1 / 60) {
        let accumulatedTime = 0;
        let lastTime = 0;

        // this function is called on every frame.
        // it normalizes the actual updates and movements so that
        // the movement is the same, in the same time, no matter what
        // the frame rate is. the frame rate will just determine how often
        // we display a frame from this movement.
        // better comments/understanding would eventually be good.
        this.updateProxy = (time) => {
            accumulatedTime += (time - lastTime) / 1000;

            while (accumulatedTime > deltaTime) {
                this.update(deltaTime);
                accumulatedTime -= deltaTime;
            }

            lastTime = time;

            this.enqueue();
        };
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
    }
}
