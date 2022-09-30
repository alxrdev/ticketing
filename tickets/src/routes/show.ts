import express, { Request, Response } from "express";
import { NotFoundError } from "@alxrdev/common";
import prisma from "../database/client";

const router = express.Router();

router.get("/api/tickets/:id", async (request: Request, response: Response) => {
  const id = parseInt(request.params.id);

  const ticket = await prisma.ticket.findUnique({
    where: {
      id: id ? id : 0,
    },
    select: {
      id: true,
      title: true,
      price: true,
    },
  });

  if (!ticket) throw new NotFoundError();

  return response.send(ticket);
});

export { router as showTicketRouter };
