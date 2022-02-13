import { AllowService } from "./../../services/allow.service";
import { OptimizeService } from "./../../services/optimize.service";
import { Test, TestingModule } from "@nestjs/testing";
import { OptimizeController } from "./optimize.controller";

describe("OptimizeController", () => {
    let optimizeController: OptimizeController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [OptimizeController],
            providers: [OptimizeService, AllowService],
        }).compile();

        optimizeController = app.get<OptimizeController>(OptimizeController);
    });

    describe("root", () => {
        it('should return "Hello World!"', () => {
            expect("Hello World!").toBe("Hello World!");
        });
    });
});
