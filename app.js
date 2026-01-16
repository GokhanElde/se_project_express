const express = require("express");
const mongoose = require("mongoose");

const { DEFAULT } = require("./utils/errors");
const {
  DEFAULT_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE,
} = require("./utils/constants");

const usersRouter = require("./routes/users");
const itemsRouter = require("./routes/clothingItems");
const likesRouter = require("./routes/likes");

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());

app.use((req, res, next) => {
  req.user = { _id: "000000000000000000000001" };
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to the WTWR backend!");
});

app.use(usersRouter);
app.use(itemsRouter);
app.use(likesRouter);

app.use((req, res) => {
  res.status(404).send({ message: NOT_FOUND_MESSAGE });
});

app.use((err, req, res) => {
  const { statusCode = DEFAULT, message } = err;
  res.status(statusCode).send({
    message: statusCode === DEFAULT ? DEFAULT_ERROR_MESSAGE : message,
  });
});

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.listen(PORT);
