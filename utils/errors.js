const {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  CREATED,
  DEFAULT,
} = require("./errorCodes");

const BadRequestError = require("./BadRequestError");
const UnauthorizedError = require("./UnauthorizedError");
const ForbiddenError = require("./ForbiddenError");
const NotFoundError = require("./NotFoundError");
const ConflictError = require("./ConflictError");

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  CREATED,
  DEFAULT,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
