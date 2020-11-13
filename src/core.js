class Processor {
    render() {
        if (this.video.paused || this.video.ended) {
            return;
        }
        this.compose();
        requestAnimationFrame(this.render.bind(this));
    }

    load() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");

        this.video = document.getElementById("video");

        this.video.addEventListener("play", () => {
            this.width = this.video.videoWidth;
            this.height = this.video.videoHeight;
            this.render();
        }, false);
    }

    compose() {
        this.context.drawImage(this.video, 0, 0, this.width, this.height);
        let frame = this.context.getImageData(0, 0, this.width, this.height);
        let length = frame.data.length / 4;

        for (let i = 0; i < length; i++) {
            let r = frame.data[i * 4 + 0];
            let g = frame.data[i * 4 + 1];
            let b = frame.data[i * 4 + 2];
            if (g > 100 && r > 100 && b < 43) {
                frame.data[i * 4 + 3] = 0;
            }

        }
        this.context.putImageData(frame, 0, 0);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const processor = new Processor();
    processor.load();
});
