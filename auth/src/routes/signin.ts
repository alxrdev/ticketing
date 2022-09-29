import { Request, Response, Router } from "express";
import { body } from "express-validator";

import prisma from "../dabase/client";
import { BadRequestError, validateRequest } from "@alxrdev/common";
import { JWTToken } from "../services/jwt-token";
import { Password } from "../services/password";

const router = Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new BadRequestError("Invalid credentials");

    const passwordsMatch = await Password.compare(user.password, password);

    if (!passwordsMatch) throw new BadRequestError("Invalid credentials");

    const token = JWTToken.sign(user);

    request.session = { token };

    return response.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
);

export { router as signinRouter };
