const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/signup", UserController.postSignUp);

router.post("/signin", UserController.postSignIn);

module.exports = router;
