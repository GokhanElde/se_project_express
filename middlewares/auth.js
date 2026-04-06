const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    const err = new Error("Authorization required");
    err.statusCode = UNAUTHORIZED;
    return next(err);
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    err.statusCode = UNAUTHORIZED;
    return next(err);
  }

  req.user = payload;
  return next();
};
