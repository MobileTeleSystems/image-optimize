import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { default as sFastify } from "fastify";
import * as fs from "fs";
import * as path from "path";

describe("OptimizeController (e2e)", () => {
    let app: INestApplication;
    const fastify = sFastify();

    beforeAll(async () => {
        const imagePath = path.join(__dirname, "test-files", "znaem.png");
        const imageBuffer = fs.readFileSync(imagePath);

        fastify.get("/image", (_req, reply) =>
            reply
                .code(200)
                .header("Content-Type", "image/png")
                .send(imageBuffer),
        );

        fastify.listen({ port: 3001 });
        await fastify.ready();
    });

    afterAll(async () => {
        await fastify.close();
    });

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("should return resized and optimized jpeg", () => {
        const search = new URLSearchParams();
        search.set("src", "http://localhost:3001/image");
        search.set("size", "512");
        search.set("format", "jpeg");

        return request(app.getHttpServer())
            .get(`/optimize?${search.toString()}`)
            .expect("Content-Type", "image/jpeg")
            .expect("Content-Length", "17458")
            .expect(200);
    });

    it("should return resized and optimized png", () => {
        const search = new URLSearchParams();
        search.set("src", "http://localhost:3001/image");
        search.set("size", "512");
        search.set("format", "png");

        return request(app.getHttpServer())
            .get(`/optimize?${search.toString()}`)
            .expect("Content-Type", "image/png")
            .expect("Content-Length", "203177")
            .expect(200);
    });

    it("should return resized and optimized webp", () => {
        const search = new URLSearchParams();
        search.set("src", "http://localhost:3001/image");
        search.set("size", "512");
        search.set("format", "webp");

        return request(app.getHttpServer())
            .get(`/optimize?${search.toString()}`)
            .expect("Content-Type", "image/webp")
            .expect("Content-Length", "12042")
            .expect(200);
    });

    it("should return resized and optimized avif", () => {
        const search = new URLSearchParams();
        search.set("src", "http://localhost:3001/image");
        search.set("size", "512");
        search.set("format", "avif");

        return request(app.getHttpServer())
            .get(`/optimize?${search.toString()}`)
            .expect("Content-Type", "image/avif")
            .expect("Content-Length", "6813")
            .expect(200);
    });
});
