import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("OptimizeController (e2e)", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("should return resized and optimized jpeg", () => {
        const search = new URLSearchParams();
        search.set("src", "https://via.placeholder.com/728x90.png");
        search.set("size", "512");
        search.set("format", "jpeg");

        return request(app.getHttpServer())
            .get(`/optimize?${search.toString()}`)
            .expect(200);
    });

    it("should return resized and optimized png", () => {
        const search = new URLSearchParams();
        search.set("src", "https://via.placeholder.com/728x90.png");
        search.set("size", "512");
        search.set("format", "png");

        return request(app.getHttpServer())
            .get(`/optimize?${search.toString()}`)
            .expect(200);
    });

    it("should return resized and optimized webp", () => {
        const search = new URLSearchParams();
        search.set("src", "https://via.placeholder.com/728x90.png");
        search.set("size", "512");
        search.set("format", "webp");

        return request(app.getHttpServer())
            .get(`/optimize?${search.toString()}`)
            .expect(200);
    });

    it("should return resized and optimized avif", () => {
        const search = new URLSearchParams();
        search.set("src", "https://via.placeholder.com/728x90.png");
        search.set("size", "512");
        search.set("format", "avif");

        return request(app.getHttpServer())
            .get(`/optimize?${search.toString()}`)
            .expect(200);
    });

});
