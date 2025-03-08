import request from "supertest";
import * as chai from "chai";
import mongoose from "mongoose";
const expect = chai.expect;
import { app, server } from "../server.js";
after(async () => {
  await server.close();
  await mongoose.disconnect();
  console.log("Server closed. DB disconnected.");
});

describe("GET /", () => {
  it("should return an error with an invalid token", async () => {
    const response = await request(app)
      .get("/api")
      .set("Authorization", "Bearer invalid-token")
      .expect(401);
    expect(response.body.error).to.equal("Invalid or expired token");
  });
});

describe("GET /api/profile/:username", () => {
  it("should fetch the user profile for username tq-cdq", async () => {
    const username = "test";
    const res = await request(app)
      .get(`/api/profile/${username}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(res.body).to.have.property("_id");
    expect(res.body).to.have.property("username", username);
    expect(res.body).to.have.property("name", "");
    expect(res.body).to.have.property("email", "danle947366@gmail.com");
    expect(res.body).to.have.property("address", "");
    expect(res.body).to.have.property("company", "");
    expect(res.body).to.have.property("phone", "");
    expect(res.body).to.have.property("role").that.is.an("array");
    expect(res.body.role).to.include("Buyer");
  });

  it("should return 404 for non-existing user", async () => {
    const username = "non-existing-user";
    const res = await request(app)
      .get(`/api/profile/${username}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);
    expect(res.body).to.have.property("error", "User not found.");
  });
});
