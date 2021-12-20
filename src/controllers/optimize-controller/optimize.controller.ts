import { Controller, Get, HttpStatus, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { BadRequestException } from "@nestjs/common";
import { OptimizeService } from "../../services/optimize.service";
import { AllowService } from "../../services/allow.service";

@Controller("optimize")
export class OptimizeController {
    constructor(
        private readonly optimizeService: OptimizeService,
        private readonly allowService: AllowService,
    ) {}

    /**
     * Sample:
     * http://localhost:3002/optimize?src=https%3A%2F%2Ftb.mts.ru%2Fstatic%2Flanding%2Fimages-index2%2Fbanner%2Fslider%2Ftv-banner-1.png&size=1920&format=avif
     * https://tb.mts.ru/optimizer/optimize?src=https%3A%2F%2Ftb.mts.ru%2Fstatic%2Flanding%2Fimages-index2%2Fslider-workzen%2Fworkzen-dark.png&size=1280&format=webp
     *
     * @param {string} src - Url to image for optimization;
     * @param {string} size - Size of result image;
     * @param {string} format - Jpeg, png, webp, avif;
     * @param response
     */
    @Get("")
    public async getPreview(
        @Query("src") src: string,
        @Query("size") size: string,
        @Query("format") format: string,
        @Query("quality") quality: string | void,
        @Res() response: Response,
    ): Promise<void> {
        if (!src) {
            throw new BadRequestException("Parameter 'src' is required.");
        }

        if (!size) {
            throw new BadRequestException("Parameter 'size' is required.");
        }

        const intSize = Number.parseInt(size);
        if (intSize <= 0) {
            throw new BadRequestException(
                "Parameter 'size' should be a positive integer.",
            );
        }

        if (!format) {
            throw new BadRequestException("Parameter 'format' is required.");
        }

        const nQuality = quality ? Number.parseInt(quality) : void 0;
        if (nQuality !== void 0) {
            if (isNaN(nQuality)) {
                throw new BadRequestException(
                    "Parameter 'quality' is not a number.",
                );
            }

            if (!(1 <= nQuality && nQuality <= 100)) {
                throw new BadRequestException(
                    "Parameter 'quality' must be in range 1-100.",
                );
            }
        }

        const decodedSrc = decodeURIComponent(src);
        if (!this.allowService.isAllowedSources(decodedSrc)) {
            throw new BadRequestException(
                "Parameter 'src' has an not allowed value.",
            );
        }

        if (!this.allowService.isAllowedSizes(intSize)) {
            throw new BadRequestException(
                "Parameter 'size' has an not allowed value.",
            );
        }

        const result = await this.optimizeService.getOptimizedImage(
            decodedSrc,
            intSize,
            format,
            nQuality,
        );

        response
            .setHeader("Content-Type", `image/${format}`)
            .status(HttpStatus.OK)
            .send(result);
    }
}
