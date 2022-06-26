import { Injectable, NestMiddleware, Logger } from "@nestjs/common";

import { Request, Response, NextFunction } from "express";
import { JsonLogger, LogLevels } from "../services/json-logger.service";

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    private logger = new JsonLogger();

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, url, query } = request;
        const userAgent = request.get("user-agent") || "not set";
        const startTime = performance.now();
        const traceId = request.get("x-trace-id") || void 0;
        const realIp = request.get("x-real-ip") || void 0;

        response.on("close", () => {
            const { statusCode } = response;
            const contentLength = response.get("content-length");

            let level = LogLevels.WARN; // for statuses 100, 300, 400, 600
            if (200 <= statusCode && statusCode < 300) {
                level = LogLevels.INFO;
            } else if (500 <= statusCode && statusCode < 600) {
                level = LogLevels.FATAL;
            }

            this.logger.extraLogs("Request", level, {
                method: method,
                url: url,
                query: query,
                statusCode: statusCode,
                contentLength: contentLength,
                userAgent: userAgent,
                userIp: realIp || ip,
                processTime: performance.now() - startTime,
                traceId: traceId,
            });
        });

        next();
    }
}
