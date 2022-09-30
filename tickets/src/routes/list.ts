import express, { Request, Response } from "express";
import prisma from "../database/client";

const router = express.Router();

router.get("/api/tickets", async (request: Request, response: Response) => {
  const tickets = await prisma.ticket.findMany();
  return response.send(tickets);
});

export { router as listTicketsRouter };
