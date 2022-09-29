import { Request, Response, Router } from "express";
import { body } from "express-validator";

import prisma from "../dabase/client";
import { validateRequest, BadRequestError } from "@alxrdev/common";
import { Password } from "../services/password";
import { JWTToken } from "../services/jwt-token";

const router = Router();

router.post(
  "/api/users/signup",
  [
    body("name").notEmpty().withMessage("The user name is required"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (request: Request, response: Response) => {
    const { name, email, password } = request.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) throw new BadRequestError("Email in use");

    const hashedPassword = await Password.toHash(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = JWTToken.sign(user);

    request.session = { token };

    return response.status(201).send({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
);

export { router as signupRouter };
