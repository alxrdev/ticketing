import { AppError } from "./AppError";

export class NotFoundError extends AppError {
  statusCode: number = 404;

  constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not found' }];
  }
}
