import { ValidationError } from "express-validator";
import { AppError } from "./AppError";

export class RequestValidationError extends AppError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Error connecting to database');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => ({
      message: error.msg,
      field: error.param,
    }));
  }
}
