import { Module } from "@nestjs/common";
import { OptimizeController } from "./controllers/optimize-controller/optimize.controller";
import { PromModule } from "@digikare/nestjs-prom";
import { OptimizeService } from "./services/optimize.service";
import { AllowService } from "./services/allow.service";

@Module({
    imports: [
        // https://github.com/digikare/nestjs-prom
        PromModule.forRoot({
            defaultLabels: {
                app: "optimize",
                version: "1.0.0",
            },
            withHttpMiddleware: {
                enable: true,
            },
        }),
    ],
    controllers: [OptimizeController],
    providers: [OptimizeService, AllowService],
})
export class AppModule {}
