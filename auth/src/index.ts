import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

import { myUserRouter } from './routes/my-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();

app.use(json());

// Routes
app.use(myUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on port 3000!!!');
});