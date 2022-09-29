import { Request, Response, Router } from "express";
import { currentUser } from "@alxrdev/common";

const router = Router();

router.get(
  "/api/users/my-user",
  currentUser,
  (request: Request, response: Response) => {
    const user = request.user;
    return response.send({ currentUser: user || null });
  }
);

export { router as myUserRouter };
