const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { BAD_REQUEST, NOT_FOUND, CONFLICT } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

module.exports.createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (typeof password !== "string" || password.trim() === "") {
    const error = new Error("Invalid data");
    error.statusCode = BAD_REQUEST;
    return next(error);
  }

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).send(userObj);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        const error = new Error("Invalid data");
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      if (err.code === 11000) {
        const error = new Error("Email already exists");
        error.statusCode = CONFLICT;
        return next(error);
      }

      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new Error("Invalid user id");
        error.statusCode = BAD_REQUEST;
        return next(error);
      }
      return next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const error = new Error("Invalid data");
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      if (err.name === "CastError") {
        const error = new Error("Invalid user id");
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      return next(err);
    });
};
