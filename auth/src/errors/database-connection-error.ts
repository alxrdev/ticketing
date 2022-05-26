import { AppError } from "./AppError";

export class DatabaseConnectionError extends AppError {
  statusCode: number = 500;
  reason: string = 'Error connecting to database';

  constructor() {
    super('Invalid request parameters');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
