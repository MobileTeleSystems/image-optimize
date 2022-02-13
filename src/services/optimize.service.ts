import { Injectable } from "@nestjs/common";
import * as sharp from "sharp"; // http://sharp.pixelplumbing.com/en/stable/api-constructor/ , https://developers.google.com/speed/webp/docs/cwebp
import fetch, { Headers } from "node-fetch";
import { Formats } from "../enums/formats";

sharp.concurrency(0);

@Injectable()
export class OptimizeService {
    public async getOptimizedImage(
        src: string,
        width: number,
        format: Formats,
        quality?: number,
    ): Promise<Buffer> {
        const imgBuffer = await this.getImage(src);

        let img = sharp(imgBuffer);
        const { width: sourceWidth } = await img.metadata();

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

    private async getImage(src: string): Promise<Buffer> {
        const fetchResponse = await fetch(src, {
            headers: this.prepareHeaders(src),
        });

        return await fetchResponse.buffer();
    }

    private prepareHeaders(src: string): Headers {
        const headers = new Headers();

        if (process.env.BASIC_AUTHS) {
            // Url, login, password
            const basicAuths: [string, string, string][] =
                process.env.BASIC_AUTHS.split(",").map((auth: string) => {
                    const parts = auth.trim().split(":");

                    return [decodeURIComponent(parts[0]), parts[1], parts[2]];
                });

            for (const auth of basicAuths) {
                if (src.startsWith(auth[0])) {
                    headers.set(
                        "Authorization",
                        "Basic " + btoa(auth[1] + ":" + auth[2]),
                    );
                    break;
                }
            }
        }

        return headers;
    }
}
