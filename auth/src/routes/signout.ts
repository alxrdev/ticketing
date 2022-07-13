import { Router } from 'express';

const router = Router();

router.post('/api/users/signout', (request, response) => {
  request.session = null;
  return response.send({});
});

export { router as signoutRouter };
