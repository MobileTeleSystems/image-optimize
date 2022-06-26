// init variables
process.env.PORT ||= "3000";
process.env.ALLOW_SIZES ||= "100-1920";
process.env.ALLOW_SOURCES ||= "*";
process.env.BASIC_AUTHS ||= void 0; // array of basic auths in format encodeURIComponent("url"):login:password, use comma as separator
process.env.SHARP_CONCURRENCY ||= "0"; // https://sharp.pixelplumbing.com/api-utility#concurrency

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { JsonLogger } from "./services/json-logger.service";

// init app
async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new JsonLogger(),
    });

    await app.listen(process.env.PORT, "0.0.0.0");
}
bootstrap();
