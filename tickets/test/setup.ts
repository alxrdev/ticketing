import request from "supertest";
import { app } from "../src/app";
import jwt from "jsonwebtoken";
import prisma from "../src/database/client";

declare global {
  var signin: () => string[];
}

beforeAll(async () => {
  await prisma.ticket.deleteMany();
});

beforeEach(async () => {
  await prisma.ticket.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

global.signin = () => {
  const payload = {
    id: 1,
    email: "test@test.com",
  };

  const token = jwt.sign(payload, process.env.JWT_KEY || "");

  const sessionJSON = JSON.stringify({ token });

  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`session=${base64}`];
};
