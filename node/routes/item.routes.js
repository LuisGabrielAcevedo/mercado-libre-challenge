const express = require("express");
const itemCtrl = require("../controllers/item.controller");
const api = express.Router();

api.get("/items", itemCtrl.getItems);
api.get("/items/:id", itemCtrl.findItem);

module.exports = api;
