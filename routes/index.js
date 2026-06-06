const router = require("express").Router();

const { login, createUser } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const {
  validateLogin,
  validateUserBody,
} = require("../middlewares/validation");
const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

router.post("/signin", validateLogin, login);
router.post("/signup", validateUserBody, createUser);
router.get("/items", getItems);

router.use(auth);

router.use("/users", usersRouter);
router.use("/items", clothingItemsRouter);

module.exports = router;
