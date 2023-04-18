import express from "express";

import "express-async-errors";

import { errorHandler,NotFoundError , currentUser} from '@manishtickets/common';
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !=='test' , //process.env.NODE_ENV !=='test' this not work find out why
  })
);
app.use(currentUser)
app.use(createTicketRouter)
app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export {app};