import { NextFunction, Request, Response } from "express";
import { JWTToken, UserPayload } from "../services/jwt-token";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const currentUser = (request: Request, response: Response, next: NextFunction) => {
  if (!request.session?.token)
    return next();

  const payload = JWTToken.decode(request.session.token) as UserPayload;
  
  request.user = payload;

  next();
}
