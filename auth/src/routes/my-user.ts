import { Router } from 'express';

const router = Router();

router.get('/api/users/my-user', (request, response) => {
  response.send('Hi there!');
});

export { router as myUserRouter };
