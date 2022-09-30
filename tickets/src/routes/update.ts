import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@alxrdev/common";
import prisma from "../database/client";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (request: Request, response: Response) => {
    const user = request.user;
    const id = parseInt(request.params.id);
    const { title, price } = request.body;

    const ticket = await prisma.ticket.findUnique({
      where: {
        id: id ? id : 0,
      },
    });

    if (!ticket) throw new NotFoundError();

    if (ticket.userId !== user!.id) throw new NotAuthorizedError();

    const updatedTicket = await prisma.ticket.update({
      where: {
        id: ticket.id,
      },
      data: {
        title,
        price,
      },
    });

    return response.status(200).send(updatedTicket);
  }
);

export { router as updateTicketRouter };
