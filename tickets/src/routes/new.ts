import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@alxrdev/common";
import prisma from "../database/client";

const router = express.Router();

router.post(
  "/api/tickets",
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
    const { title, price } = request.body;

    const ticket = await prisma.ticket.create({
      data: {
        title,
        price,
        userId: user!.id,
      },
    });

    return response.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
