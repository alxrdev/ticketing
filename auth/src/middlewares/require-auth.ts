import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (request: Request, response: Response, next: NextFunction) => {
  if (!request.user) throw new NotAuthorizedError();
  
  next();
}
