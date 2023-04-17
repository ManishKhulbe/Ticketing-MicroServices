import { Password } from "./../../services/password";
import request from "supertest";
import { app } from "../../app";

it("should return a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("should return a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "afdsfdd.com",
      password: "password",
    })
    .expect(400);
});

it("should return a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "afdsfdd.com",
      password: "p",
    })
    .expect(400);
});

it("should return a 400 with missing email password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com" })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({ password: "adfdfdsa" })
    .expect(400);
  await request(app).post("/api/users/signup").send({}).expect(400);
});

it("should disallows duplicate emails", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com" , password:"password"})
      .expect(201);
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com" , password:"password"})
      .expect(400);
  });

it('should sets cookie after successful signup', async()=>{
    const response =  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com" , password:"password"})
    .expect(201);

    await expect(response.get('Set-Cookie')).toBeDefined();
})
