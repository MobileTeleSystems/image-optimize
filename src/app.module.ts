import { MetricsController } from "./controllers/metrics/metrics.controller";
import { Module } from "@nestjs/common";
import { OptimizeController } from "./controllers/optimize-controller/optimize.controller";
import { OptimizeService } from "./services/optimize.service";
import { AllowService } from "./services/allow.service";
import { NestModule, MiddlewareConsumer } from "@nestjs/common";
import { RequestLoggerMiddleware } from "./middleware/RequestLoggerMiddleware";
import { ImgLoaderService } from "./services/img-loader.service";

@Module({
    imports: [],
    controllers: [OptimizeController, MetricsController],
    providers: [OptimizeService, AllowService, ImgLoaderService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(RequestLoggerMiddleware).forRoutes("*");
    }
}
