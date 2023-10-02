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
        const img = sharp(imgBuffer);
        const { width: sourceWidth } = await img.metadata();

        // Math.min prevent grow image to biggest width
        img.resize({ width: Math.min(sourceWidth, width) });

        return await img[format]({ quality }).toBuffer();
    }
}
