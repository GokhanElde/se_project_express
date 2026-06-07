const { NOT_FOUND } = require("./errorCodes");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
    this.name = "NotFoundError";
  }
}

module.exports = NotFoundError;
