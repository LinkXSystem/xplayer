class Convolution {
    static setFlipKernel(kernel) {
        const height = kernel.length;
        const half = Math.floor(height / 2);

        for (let i = 0; i < half; i++) {
            for (let j = 0; j < height; j++) {
                let _t = kernel[i][j];
                kernel[i][j] = kernel[height - i - 1][height - j - 1];
                kernel[height - i - 1][height - j - 1] = _t;
            }
        }

        if (height & 1) {
            for (let j = 0; j < half; j++) {
                let _t = kernel[half][j];
                kernel[half][j] = kernel[half][height - j - 1];
                kernel[half][height - j - 1] = _t;
            }
        }

        return kernel;
    }

    static setConvFilter(data, width, height, kernel) {
        const divisor = 4;
        const h = kernel.length;
        const w = h;

        const half = Math.floor(h / 2);

        for (let i = half; i < height - half; i++) {
            for (let j = 0; j < width - half; j++) {
                const px = (i * width + j) * 4;
                let r = 0, g = 0, b = 0;

                for (let y = 0; y < h; y++) {
                    for (let x = 0; x < w; x++) {
                        const cpx = ((i + (y - half)) * width + (j + (x - half))) * 4;
                        r += data[cpx + 0] * kernel[y][x];
                        g += data[cpx + 1] * kernel[y][x];
                        b += data[cpx + 2] * kernel[y][x];
                    }
                }

                data[px + 0] = ((r / divisor) > 255) ? 255 : ((r / divisor) < 0) ? 0 : r;
                data[px + 1] = ((g / divisor) > 255) ? 255 : ((g / divisor) < 0) ? 0 : g;
                data[px + 2] = ((b / divisor) > 255) ? 255 : ((b / divisor) < 0) ? 0 : b;
            }
        }

        return data;
    }
}