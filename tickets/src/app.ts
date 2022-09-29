import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError } from "@alxrdev/common";

const app = express();

app.set("trust proxy", true); // the connection is injected in the application by gnix

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// Routes

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };