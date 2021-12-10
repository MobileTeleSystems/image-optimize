import { Injectable } from "@nestjs/common";

@Injectable()
export class AllowService {
    public isAllowedSizes(intSize: number): boolean {
        if (!process.env.ALLOW_SIZES || process.env.ALLOW_SIZES === "*") {
            return true;
        }

        /**
         * Variants:
         * 300
         * 600,900
         * 100-1920
         */
        const allowSizes = process.env.ALLOW_SIZES.split(",");

        return allowSizes.some((size) => {
            if (size.includes("-")) {
                const range = size.split("-");

                const min = Number(range[0].trim()) || Number.MIN_SAFE_INTEGER;
                const max = Number(range[1].trim()) || Number.MAX_SAFE_INTEGER;

                return min <= intSize && intSize <= max;
            } else {
                return intSize === Number(size.trim());
            }
        });
    }

    public isAllowedSources(src: string): boolean {
        if (!process.env.ALLOW_SOURCES || process.env.ALLOW_SOURCES === "*") {
            return true;
        }

        const allowSources = process.env.ALLOW_SOURCES.split(",").map(
            (souce: string) => decodeURIComponent(souce.trim()),
        );

        return allowSources.some((souce) => src.startsWith(souce));
    }
}
