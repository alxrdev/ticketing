import request from "supertest";
import { app } from "../../../src/app";
import prisma from "../../../src/database/client";

describe("Test the new.ts", () => {
  it("has a route hanlder listening to /api/tickets for post requests", async () => {
    const response = await request(app).post("/api/tickets").send({});
    expect(response.status).not.toEqual(404);
  });

  it("can only be accessed if the user is signed in", async () => {
    const response = await request(app).post("/api/tickets").send();
    expect(response.status).toEqual(401);
  });

  it("returns a status other tnah 401 if the user is signed in", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send();
    expect(response.status).not.toEqual(401);
  });

  it("returns an error if an invalid title is provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        title: "",
        price: 10,
      })
      .expect(400);

    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        price: 10,
      })
      .expect(400);
  });

  it("returns an error if an invalid price is provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        title: "my ticket",
        price: -10,
      })
      .expect(400);

    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        title: "my ticket 2",
      })
      .expect(400);
  });

  it("creates a ticket with valid inputs", async () => {
    let tickets = await prisma.ticket.findMany();

    expect(tickets.length).toEqual(0);

    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        title: "my ticket",
        price: 20,
      })
      .expect(201);

    tickets = await prisma.ticket.findMany();

    expect(tickets.length).toEqual(1);
    expect(tickets[0].price.toNumber()).toEqual(20);
  });
});
