import { Controller, Get, HttpStatus, Query, Res } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common";
import { OptimizeService } from "../../services/optimize.service";
import { AllowService } from "../../services/allow.service";
import { Formats } from "../../enums/formats";
import { enumFromStringValue } from "../../utils/enumFromStringValue";
import { Response } from "express";
import { ImgLoaderService } from "../../services/img-loader.service";

@Controller("optimize")
export class OptimizeController {
    constructor(
        private readonly optimizeService: OptimizeService,
        private readonly imgLoaderService: ImgLoaderService,
        private readonly allowService: AllowService,
    ) {}

    /**
     * Sample:
     * http://localhost:3000/optimize?src=https%3A%2F%2Ftb.mts.ru%2Fstatic%2Flanding%2Fimages-index2%2Fbanner%2Fslider%2Fznaem2.png&size=1920&quality=80&format=avif
     * https://tb.mts.ru/optimizer/optimize?src=https%3A%2F%2Ftb.mts.ru%2Fstatic%2Flanding%2Fimages-index2%2Fbanner%2Fslider%2Fznaem2.png&size=1920&quality=80&format=avif
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

        const enumFormat = enumFromStringValue(Formats, format);
        if (enumFormat === void 0) {
            throw new BadRequestException(
                "Parameter 'format' is not supported.",
            );
        }

        const intQuality = quality ? Number.parseInt(quality) : void 0;
        if (intQuality !== void 0) {
            if (isNaN(intQuality)) {
                throw new BadRequestException(
                    "Parameter 'quality' is not a number.",
                );
            }

            if (!(1 <= intQuality && intQuality <= 100)) {
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

        const imgBuffer = await this.imgLoaderService.getImage(decodedSrc);

        const result = await this.optimizeService.getOptimizedImage(
            imgBuffer,
            intSize,
            enumFormat,
            intQuality,
        );

        response
            .setHeader("Content-Type", `image/${enumFormat}`)
            .status(HttpStatus.OK)
            .send(result);
    }
}
