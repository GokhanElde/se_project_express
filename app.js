const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { DEFAULT, NOT_FOUND } = require("./utils/errors");
const {
  DEFAULT_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE,
} = require("./utils/constants");

const mainRouter = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());

app.use(cors());

app.use(mainRouter);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: NOT_FOUND_MESSAGE });
});

const errorHandler = (err, req, res, next) => {
  void next;
  const { statusCode = DEFAULT, message } = err;

  res.status(statusCode).send({
    message: statusCode === DEFAULT ? DEFAULT_ERROR_MESSAGE : message,
  });
};

app.use(errorHandler);

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.listen(PORT);
