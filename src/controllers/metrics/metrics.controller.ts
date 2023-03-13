import { Controller, Response, Get } from "@nestjs/common";
import { Response as EResponse } from "express";
import { collectDefaultMetrics, Registry } from "prom-client";

const register = new Registry();
collectDefaultMetrics({
    register: register,
    eventLoopMonitoringPrecision: 100,
});

@Controller("metrics")
export class MetricsController {
    @Get()
    public async getMetrics(@Response() response: EResponse) {
        return response
            .set("Content-Type", register.contentType)
            .send(await register.metrics());
    }
}
