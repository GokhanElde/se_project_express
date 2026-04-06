const ClothingItem = require("../models/clothingItem");
const { BAD_REQUEST, NOT_FOUND, FORBIDDEN } = require("../utils/errors");

module.exports.getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);
};

module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const error = new Error("Invalid data");
        error.statusCode = BAD_REQUEST;
        return next(error);
      }
      return next(err);
    });
};

module.exports.deleteItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        const error = new Error("Forbidden");
        error.statusCode = FORBIDDEN;
        throw error;
      }
      return item.deleteOne().then(() => res.send(item));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new Error("Invalid item id");
        error.statusCode = BAD_REQUEST;
        return next(error);
      }
      return next(err);
    });
};

module.exports.likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new Error("Invalid item id");
        error.statusCode = BAD_REQUEST;
        return next(error);
      }
      return next(err);
    });
};

module.exports.dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new Error("Invalid item id");
        error.statusCode = BAD_REQUEST;
        return next(error);
      }
      return next(err);
    });
};
