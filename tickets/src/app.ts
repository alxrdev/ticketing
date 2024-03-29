import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@alxrdev/common";

import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { listTicketsRouter } from "./routes/list";
import { updateTicketRouter } from "./routes/update";

const app = express();

app.set("trust proxy", true); // the connection is injected in the application by gnix

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

// Routes
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(listTicketsRouter);
app.use(updateTicketRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
