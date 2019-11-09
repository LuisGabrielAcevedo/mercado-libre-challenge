const express = require("express");
const itemCtrl = require("../controllers/item.controller");
const api = express.Router();
const queryMiddleware = require("../middlewares/query");

api.get("/items", queryMiddleware.pagination, itemCtrl.getItems);
api.get("/items/:id", itemCtrl.findItem);
api.get("/items/:id/pictures", itemCtrl.itemPictures);

module.exports = api;
