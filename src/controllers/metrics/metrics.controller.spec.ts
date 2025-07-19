import { Test, TestingModule } from "@nestjs/testing";
import { MetricsController } from "./metrics.controller";
import { Response } from "express";

describe("MetricsController", () => {
    let appController: MetricsController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [MetricsController],
            providers: [],
        }).compile();

        appController = app.get<MetricsController>(MetricsController);
    });

    describe("getMetrics", () => {
        it("should return metrics with correct content type and response", async () => {
            const mockSet = jest.fn().mockReturnThis();
            const mockSend = jest.fn().mockReturnThis();
            const mockResponse = {
                set: mockSet,
                send: mockSend,
            } as unknown as Response;

            const result = await appController.getMetrics(mockResponse);

            // Check that response methods are called correctly
            expect(mockSet).toHaveBeenCalledTimes(1);
            expect(mockSet).toHaveBeenCalledWith(
                "Content-Type",
                expect.stringContaining("text/plain"),
            );

            expect(mockSend).toHaveBeenCalledTimes(1);

            // Check that result contains Prometheus metrics
            expect(mockSend).toHaveBeenCalledWith(
                expect.stringContaining("# HELP"),
            );
            expect(mockSend).toHaveBeenCalledWith(
                expect.stringContaining("# TYPE"),
            );

            // Check that metrics contain CPU and RAM consumption values
            expect(mockSend).toHaveBeenCalledWith(
                expect.stringContaining("process_cpu_user_seconds_total"),
            );
            expect(mockSend).toHaveBeenCalledWith(
                expect.stringContaining("process_cpu_system_seconds_total"),
            );
            expect(mockSend).toHaveBeenCalledWith(
                expect.stringContaining("process_resident_memory_bytes"),
            );
            expect(mockSend).toHaveBeenCalledWith(
                expect.stringContaining("nodejs_heap_size_total_bytes"),
            );
            expect(mockSend).toHaveBeenCalledWith(
                expect.stringContaining("nodejs_heap_size_used_bytes"),
            );

            // Check method result
            expect(result).toBe(mockResponse);
        });
    });
});
