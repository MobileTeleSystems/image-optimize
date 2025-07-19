import { Test, TestingModule } from "@nestjs/testing";
import { OptimizeController } from "./optimize.controller";
import { OptimizeService } from "../../services/optimize.service";
import { AllowService } from "../../services/allow.service";
import { ImgLoaderService } from "../../services/img-loader.service";
import { BadRequestException } from "@nestjs/common";
import { Response } from "express";

describe("OptimizeController", () => {
    let optimizeController: OptimizeController;
    let allowService: AllowService;

    beforeEach(async () => {
        const mockAllowService = {
            isAllowedSources: jest.fn(),
            isAllowedSizes: jest.fn(),
        };

        const mockImgLoaderService = {
            getImage: jest.fn(),
        };

        const mockOptimizeService = {
            getOptimizedImage: jest.fn(),
        };

        const app: TestingModule = await Test.createTestingModule({
            controllers: [OptimizeController],
            providers: [
                {
                    provide: OptimizeService,
                    useValue: mockOptimizeService,
                },
                {
                    provide: AllowService,
                    useValue: mockAllowService,
                },
                {
                    provide: ImgLoaderService,
                    useValue: mockImgLoaderService,
                },
            ],
        }).compile();

        optimizeController = app.get<OptimizeController>(OptimizeController);
        allowService = app.get<AllowService>(AllowService);
    });

    describe("getPreview - negative scenarios for query parameters", () => {
        let mockResponse: Partial<Response>;

        beforeEach(() => {
            mockResponse = {
                setHeader: jest.fn().mockReturnThis(),
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };
        });

        it("should throw BadRequestException if src parameter is missing", async () => {
            await expect(
                optimizeController.getPreview(
                    "",
                    "1920",
                    "jpeg",
                    "80",
                    mockResponse as Response,
                ),
            ).rejects.toThrow(
                new BadRequestException("Parameter 'src' is required."),
            );
        });

        it("should throw BadRequestException if size parameter is missing", async () => {
            await expect(
                optimizeController.getPreview(
                    "https://example.com/image.jpg",
                    "",
                    "jpeg",
                    "80",
                    mockResponse as Response,
                ),
            ).rejects.toThrow(
                new BadRequestException("Parameter 'size' is required."),
            );
        });

        it("should throw BadRequestException if size is zero", async () => {
            await expect(
                optimizeController.getPreview(
                    "https://example.com/image.jpg",
                    "0",
                    "jpeg",
                    "80",
                    mockResponse as Response,
                ),
            ).rejects.toThrow(
                new BadRequestException(
                    "Parameter 'size' should be a positive integer.",
                ),
            );
        });

        it("should throw BadRequestException if size is negative", async () => {
            await expect(
                optimizeController.getPreview(
                    "https://example.com/image.jpg",
                    "-100",
                    "jpeg",
                    "80",
                    mockResponse as Response,
                ),
            ).rejects.toThrow(
                new BadRequestException(
                    "Parameter 'size' should be a positive integer.",
                ),
            );
        });

        it("should throw BadRequestException if format parameter is missing", async () => {
            await expect(
                optimizeController.getPreview(
                    "https://example.com/image.jpg",
                    "1920",
                    "",
                    "80",
                    mockResponse as Response,
                ),
            ).rejects.toThrow(
                new BadRequestException("Parameter 'format' is required."),
            );
        });

        it("should throw BadRequestException if format is not supported", async () => {
            await expect(
                optimizeController.getPreview(
                    "https://example.com/image.jpg",
                    "1920",
                    "gif",
                    "80",
                    mockResponse as Response,
                ),
            ).rejects.toThrow(
                new BadRequestException("Parameter 'format' is not supported."),
            );
        });

        it("should throw BadRequestException if quality is not a number", async () => {
            await expect(
                optimizeController.getPreview(
                    "https://example.com/image.jpg",
                    "1920",
                    "jpeg",
                    "abc",
                    mockResponse as Response,
                ),
            ).rejects.toThrow(
                new BadRequestException("Parameter 'quality' is not a number."),
            );
        });

        it("should throw BadRequestException if quality is less than 1", async () => {
            await expect(
                optimizeController.getPreview(
                    "https://example.com/image.jpg",
                    "1920",
                    "jpeg",
                    "0",
                    mockResponse as Response,
                ),
            ).rejects.toThrow(
                new BadRequestException(
                    "Parameter 'quality' must be in range 1-100.",
                ),
            );
        });

        it("should throw BadRequestException if quality is greater than 100", async () => {
            await expect(
                optimizeController.getPreview(
                    "https://example.com/image.jpg",
                    "1920",
                    "jpeg",
                    "101",
                    mockResponse as Response,
                ),
            ).rejects.toThrow(
                new BadRequestException(
                    "Parameter 'quality' must be in range 1-100.",
                ),
            );
        });

        it("should throw BadRequestException if src is not allowed", async () => {
            (allowService.isAllowedSources as jest.Mock).mockReturnValue(false);

            await expect(
                optimizeController.getPreview(
                    "https://malicious.com/image.jpg",
                    "1920",
                    "jpeg",
                    "80",
                    mockResponse as Response,
                ),
            ).rejects.toThrow(
                new BadRequestException(
                    "Parameter 'src' has an not allowed value.",
                ),
            );
        });

        it("should throw BadRequestException if size is not allowed", async () => {
            (allowService.isAllowedSources as jest.Mock).mockReturnValue(true);
            (allowService.isAllowedSizes as jest.Mock).mockReturnValue(false);

            await expect(
                optimizeController.getPreview(
                    "https://example.com/image.jpg",
                    "5000",
                    "jpeg",
                    "80",
                    mockResponse as Response,
                ),
            ).rejects.toThrow(
                new BadRequestException(
                    "Parameter 'size' has an not allowed value.",
                ),
            );
        });
    });
});
