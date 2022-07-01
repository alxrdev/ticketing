import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error";

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).send({ errors: error.serializeErrors() });
  }
  
  return response
    .status(500)
    .send({
      errors: [{
        message: "Something went wrong",
      }]
    });
}

export  { errorHandler };