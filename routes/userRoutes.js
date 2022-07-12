const express = require("express");
const userRouter = express.Router();

const usersController = require("../controllers/userController");

userRouter.post("/register", usersController.Register);
userRouter.post("/login", usersController.Login);

module.exports = { userRouter };
