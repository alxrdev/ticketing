import prisma from '../dabase/client';
import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';

const router = Router();

router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password mut be between 4 and 20 characters'),
  ],
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

    const { name, email, password } = request.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) throw new BadRequestError('Email in use');

    const hashedPassword = await Password.toHash(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    return response.status(201).send({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
);

export { router as signupRouter };
