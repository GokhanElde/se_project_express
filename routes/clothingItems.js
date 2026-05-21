const router = require("express").Router();
const { validateCardBody, validateId } = require("../middlewares/validation");

const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.post("/items", validateCardBody, createItem);
router.delete("/items/:itemId", validateId, deleteItem);
router.put("/items/:itemId/likes", validateId, likeItem);
router.delete("/items/:itemId/likes", validateId, dislikeItem);

module.exports = router;
