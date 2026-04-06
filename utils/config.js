const { NODE_ENV, JWT_SECRET } = process.env;

const DEFAULT_SECRET = "dev-secret";

module.exports = {
  JWT_SECRET: NODE_ENV === "production" ? JWT_SECRET : DEFAULT_SECRET,
};
