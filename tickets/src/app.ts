import express from "express";

import "express-async-errors";

import { errorHandler,NotFoundError } from '@manishtickets/common';
import cookieSession from "cookie-session";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false, //process.env.NODE_ENV !=='test' this not work find out why
  })
);


app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export {app};