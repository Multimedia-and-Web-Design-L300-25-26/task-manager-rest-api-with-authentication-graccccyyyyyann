import User from '../src/models/User.js';

beforeAll(async () => {
  // Remove test user before tests
  await User.deleteOne({ email: 'test@example.com' });
});
import { jest } from '@jest/globals';
import request from "supertest";
import app from "../src/app.js";

jest.setTimeout(20000);

describe("Auth Routes", () => {

  let token;

  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("test@example.com");
  });

  it("should login user and return token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

});
import mongoose from "mongoose";

afterAll(async () => {
  await mongoose.connection.close();
});