import { Module } from "@nestjs/common";
import { OptimizeController } from "./controllers/optimize-controller/optimize.controller";
import { OptimizeService } from "./services/optimize.service";
import { AllowService } from "./services/allow.service";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { NestModule, MiddlewareConsumer } from "@nestjs/common";
import { RequestLoggerMiddleware } from "./middleware/RequestLoggerMiddleware";
import { ImgLoaderService } from "./services/img-loader.service";

@Module({
    imports: [PrometheusModule.register()],
    controllers: [OptimizeController],
    providers: [OptimizeService, AllowService, ImgLoaderService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(RequestLoggerMiddleware).forRoutes("*");
    }
}
