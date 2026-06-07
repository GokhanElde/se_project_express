const { UNAUTHORIZED } = require("./errorCodes");

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
    this.name = "UnauthorizedError";
  }
}

module.exports = UnauthorizedError;
