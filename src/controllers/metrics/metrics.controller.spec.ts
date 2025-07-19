import { Test, TestingModule } from "@nestjs/testing";
import { MetricsController } from "./metrics.controller";

describe("MetricsController", () => {
    let appController: MetricsController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [MetricsController],
            providers: [],
        }).compile();

        appController = app.get<MetricsController>(MetricsController);
    });

    describe("root", () => {
        it('should return "Hello World!"', () => {
            expect(typeof appController).toBe("object");
            expect("Hello World!").toBe("Hello World!");
        });
    });
});
