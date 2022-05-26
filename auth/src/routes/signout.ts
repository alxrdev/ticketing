import { Router } from 'express';

const router = Router();

router.post('/api/users/signout', (request, response) => {
  response.send('Hi there!');
});

export { router as signoutRouter };
