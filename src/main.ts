// init variables
process.env.PORT ||= "3000";
process.env.ALLOW_SIZES ||= "100-1920";
process.env.ALLOW_SOURCES ||= "*";
process.env.BASIC_AUTHS ||= void 0; // array of basic auths in format encodeURIComponent("url"):login:password, use comma as separator
process.env.SHARP_CONCURRENCY ||= "0"; // https://sharp.pixelplumbing.com/api-utility#concurrency
process.env.LOGS_FORMAT ||= "default"; // default, json

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
    FastifyAdapter,
    NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { FastifyJsonLogger, JsonLogger } from "./services/json-logger.service";

// init app
async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: new FastifyJsonLogger() }),
        {
            logger: new JsonLogger(),
        },
    );

    await app.listen(process.env.PORT, "0.0.0.0");
}
bootstrap();
