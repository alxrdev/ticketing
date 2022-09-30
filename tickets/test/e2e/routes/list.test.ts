import request from "supertest";
import { app } from "../../../src/app";
import prisma from "../../../src/database/client";

const createTicket = () => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "my ticket",
      price: 20,
    })
    .expect(201);
};

describe("Test the list.ts", () => {
  beforeEach(async () => {
    await prisma.ticket.deleteMany();
  });

  afterAll(async () => {
    await prisma.ticket.deleteMany();
  });

  it("can fetch a list of tickets", async () => {
    await Promise.all([createTicket(), createTicket(), createTicket()]);

    const ticket = await request(app).get("/api/tickets").send().expect(200);

    expect(ticket.body.length).toEqual(3);
  });
});
