import { Module } from "@nestjs/common";
import { OptimizeController } from "./controllers/optimize-controller/optimize.controller";
import { OptimizeService } from "./services/optimize.service";
import { AllowService } from "./services/allow.service";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";

@Module({
    imports: [PrometheusModule.register()],
    controllers: [OptimizeController],
    providers: [OptimizeService, AllowService],
})
export class AppModule {}
