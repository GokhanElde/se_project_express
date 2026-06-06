require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const { DEFAULT, NOT_FOUND } = require("./utils/errors");
const {
  DEFAULT_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE,
} = require("./utils/constants");

const mainRouter = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

app.use(cors());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(mainRouter);

app.use((req, res, next) => {
  const error = new Error(NOT_FOUND_MESSAGE);
  error.statusCode = NOT_FOUND;
  next(error);
});

app.use(errorLogger);

app.use(errors());

const errorHandler = (err, req, res) => {
  // eslint-disable-next-line no-console
  console.error(err);

  const { statusCode = DEFAULT, message } = err;

  res.status(statusCode).send({
    message: statusCode === DEFAULT ? DEFAULT_ERROR_MESSAGE : message,
  });
};

app.use(errorHandler);

app.listen(PORT);
