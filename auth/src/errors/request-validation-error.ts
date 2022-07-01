import { ValidationError } from "express-validator";
import { AppError } from "./app-error";

export class RequestValidationError extends AppError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => ({
      message: error.msg,
      field: error.param,
    }));
  }
}
