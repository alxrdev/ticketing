import request from "supertest";
import { app } from "../../../src/app";
import prisma from "../../../src/database/client";

describe("Test the update.ts", () => {
  beforeEach(async () => {
    await prisma.ticket.deleteMany();
  });

  afterAll(async () => {
    await prisma.ticket.deleteMany();
  });

  it("returns a 404 if the provided id does not exists", async () => {
    await request(app)
      .put("/api/tickets/asdfas")
      .set("Cookie", global.signin())
      .send({
        title: "my ticket",
        price: 20,
      })
      .expect(404);
  });

  it("returns a 401 if the user is not authenticated", async () => {
    await request(app)
      .put("/api/tickets/asdfas")
      .send({
        title: "my ticket",
        price: 20,
      })
      .expect(401);
  });

  it("returns a 401 if the user does not own the ticket", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        title: "my ticket",
        price: 20,
      })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", global.signin())
      .send({
        title: "my ticket",
        price: 1000,
      })
      .expect(401);
  });

  it("returns a 400 if user provides an invalid title or price", async () => {
    const cookie = global.signin();

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({
        title: "my ticket",
        price: 20,
      })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "",
        price: 20,
      })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "my ticket",
        price: -10,
      })
      .expect(400);
  });

  it("updates the ticket provided valid inputs", async () => {
    const cookie = global.signin();

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({
        title: "my ticket",
        price: 20,
      })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "updated",
        price: 100,
      })
      .expect(200);

    const ticket = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send();

    expect(ticket.body.title).toEqual("updated");
    expect(ticket.body.price).toEqual("100");
  });
});
