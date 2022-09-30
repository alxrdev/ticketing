import request from "supertest";
import { app } from "../../../src/app";

describe("Test the new.ts", () => {
  it("returns a 404 if the ticket is not found", async () => {
    await request(app).get("/api/tickets/asdas").send().expect(404);
  });

  it("returns the ticket if the ticket is found", async () => {
    const title = "my ticket";
    const price = "20";

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        title,
        price,
      })
      .expect(201);

    const ticket = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send()
      .expect(200);

    expect(ticket.body.title).toEqual(title);
    expect(ticket.body.price).toEqual(price);
  });
});
