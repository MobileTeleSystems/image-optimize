import { LoggerService } from "@nestjs/common";
import { hostname } from "os";

export enum LogLevels {
    FATAL = 60,
    ERROR = 50,
    WARN = 40,
    INFO = 30,
    DEBUG = 20,
    TRACE = 10,
}

export class JsonLogger implements LoggerService {

    protected hostname: string = hostname();

    /**
     * Write a 'log' level log.
     */
    public log(message: any, ...optionalParams: unknown[]) {
        this.writeJson(message, LogLevels.INFO);
    }

    /**
     * Write an 'error' level log.
     */
    public error(message: any, ...optionalParams: unknown[]) {
        this.writeJson(message, LogLevels.ERROR);
    }

    /**
     * Write a 'warn' level log.
     */
    public warn(message: any, ...optionalParams: unknown[]) {
        this.writeJson(message, LogLevels.WARN);
    }

    /**
     * Write a 'debug' level log.
     */
    public debug(message: any, ...optionalParams: unknown[]) {
        this.writeJson(message, LogLevels.DEBUG);
    }

    /**
     * Write a 'verbose' level log.
     */
    public verbose(message: any, ...optionalParams: unknown[]) {
        this.writeJson(message, LogLevels.TRACE);
    }

    public extraLogs(
        message: any,
        level: number,
        extraProps: object = {},
    ): void {
        this.writeJson(message, level, extraProps);
    }

    protected writeJson(
        message: any,
        level: number,
        extraProps: object = {},
    ): void {
        console.log(
            JSON.stringify({
                message: message,
                ...extraProps,
                time: Date.now(),
                level: level,
                hostname: this.hostname,
                service: "image-optimize",
            }),
        );
    }
}

export class FastifyJsonLogger extends JsonLogger {
    public info(message: string, ...args: unknown[]): void {
        this.writeJson(message, LogLevels.INFO);
    }

    public fatal(msg: string, ...args: unknown[]): void {
        this.writeJson(msg, LogLevels.FATAL);
    }

    public trace(message: string, ...args: unknown[]): void {
        this.writeJson(message, LogLevels.TRACE);
    }

    public child(): FastifyJsonLogger {
        return new FastifyJsonLogger();
    }
}
