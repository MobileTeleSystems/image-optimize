import { Injectable } from "@nestjs/common";
import fetch, { Headers } from "node-fetch";

@Injectable()
export class ImgLoaderService {
    protected basicAuths: [string, string, string][] = []; // Url, login, password

    constructor() {
        this.extractBasicAuth();
    }

    public async getImage(src: string): Promise<Buffer> {
        const fetchResponse = await fetch(src, {
            headers: this.prepareHeaders(src),
        });

        return await fetchResponse.buffer();
    }

    protected prepareHeaders(src: string): Headers {
        const headers = new Headers();

        for (const auth of this.basicAuths) {
            if (src.startsWith(auth[0])) {
                const basic = Buffer.from(
                    `${auth[1]}:${auth[2]}`,
                    "utf8",
                ).toString("base64");

                headers.set("Authorization", "Basic " + basic);
                break;
            }
        }

        return headers;
    }

    protected extractBasicAuth(): void {
        if (process.env.BASIC_AUTHS) {
            this.basicAuths = process.env.BASIC_AUTHS.split(",").map(
                (auth: string) => {
                    const parts = auth.trim().split(":");

                    return [
                        decodeURIComponent(parts[0]),
                        decodeURIComponent(parts[1]),
                        decodeURIComponent(parts[2]),
                    ];
                },
            );
        }
    }
}
