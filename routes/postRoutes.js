const express = require("express");
const postsRouter = express.Router();

const postsController = require("../controllers/postsController");
const userAuth = require("../middleware/authMiddlware");

postsRouter.get("/", userAuth, postsController.getPosts);

module.exports = { postsRouter };
