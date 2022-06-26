import { Injectable } from "@nestjs/common";
import * as sharp from "sharp"; // http://sharp.pixelplumbing.com/en/stable/api-constructor/ , https://developers.google.com/speed/webp/docs/cwebp
import { Formats } from "../enums/formats";

sharp.concurrency(Number.parseInt(process.env.SHARP_CONCURRENCY, 10));

@Injectable()
export class OptimizeService {
    public async getOptimizedImage(
        imgBuffer: Buffer,
        width: number,
        format: Formats,
        quality?: number,
    ): Promise<Buffer> {
        let img = sharp(imgBuffer);
        const { width: sourceWidth } = await img.metadata();

        // Math.min prevent grow image to biggest width
        img.resize({ width: Math.min(sourceWidth, width) });

        if (format === Formats.Webp) {
            img = img.webp({ quality });
        } else if (format === Formats.Avif) {
            img = img.avif({ quality });
        } else if (format === Formats.Png) {
            img = img.png({ quality });
        } else if (format === Formats.Jpeg) {
            img = img.jpeg({ quality });
        }

        return await img.toBuffer();
    }
}
