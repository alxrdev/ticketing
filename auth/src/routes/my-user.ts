import { Request, Response, Router } from 'express';
import { JWTToken } from '../services/jwt-token';

const router = Router();

router.get('/api/users/my-user', (request: Request, response: Response) => {
  if (!request.session?.token)
    return response.send({ currentUser: null });

  const payload = JWTToken.decode(request.session.token);
  
  return response.send({ currentUser: payload });
});

export { router as myUserRouter };
