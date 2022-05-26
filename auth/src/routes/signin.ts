import { Router } from 'express';

const router = Router();

router.post('/api/users/signin', (request, response) => {
  response.send('Hi there!');
});

export { router as signinRouter };
