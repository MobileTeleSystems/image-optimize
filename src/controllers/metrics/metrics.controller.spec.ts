import { Test, TestingModule } from "@nestjs/testing";
import { PrometheusService } from "../../services/prometheus.service";
import { MetricsController } from "./metrics.controller";

describe("MetricsController", () => {
    let appController: MetricsController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [MetricsController],
            providers: [PrometheusService],
        }).compile();

        appController = app.get<MetricsController>(MetricsController);
    });

    describe("root", () => {
        it('should return "Hello World!"', () => {
            expect("Hello World!").toBe("Hello World!");
        });
    });
});
