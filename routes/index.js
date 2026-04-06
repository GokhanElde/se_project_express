const router = require("express").Router();

const { login, createUser } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

router.post("/signin", login);
router.post("/signup", createUser);
router.get("/items", getItems);

router.use(auth);

router.use(usersRouter);
router.use(clothingItemsRouter);

module.exports = router;
