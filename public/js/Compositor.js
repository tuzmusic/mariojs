export class Compositor {
    constructor() {
        this.layers = [];
    }

    // Each layer is actually a draw function, so here we call
    // each of those functions and draw the layer in the context.
    draw(context, camera) {
        this.layers.forEach(drawLayer => drawLayer(context, camera));
    }
}
