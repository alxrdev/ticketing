import jwt from 'jsonwebtoken';
import { User } from "@prisma/client";

export interface UserPayload {
  id: string;
  name: string;
  email: string;
}

export class JWTToken {
  static sign(user: User) {
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_KEY || ""
    );
    
    return token;
  }

  static decode(token: string) {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY || "");
      return payload as UserPayload;
    } catch (error) {
      return null;
    }
  }
}
