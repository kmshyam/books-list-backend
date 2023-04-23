const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const SECRET_KEY = "asdfghjklkjhgfdsa";
const UserModel = require("../models/user-schema");
const {
  randomTwoDigitNumber,
  randomFiveDigitNumber,
} = require("../utils/utils");

exports.postSignUp = (req, res) => {
  const name = req.body.email.split("@")[0];
  const userId = `${randomTwoDigitNumber()}BKS${randomFiveDigitNumber()}`;
  bcrypt.genSalt(saltRounds, (saltError, saltValue) => {
    if (!saltError) {
      bcrypt.hash(
        req.body.password,
        saltValue,
        async (hashError, hashValue) => {
          if (!hashError) {
            try {
              const user = await UserModel.create({
                email: req.body.email,
                password: hashValue,
                userID: userId,
                username: `${name}-${
                  userId.split("BKS")[0] + userId.split("BKS")[1]
                }`,
              });
              res.status(200).json({
                status: "Success",
                user,
              });
            } catch (err) {
              res.status(500).json({
                status: "Failed",
                message: err.message,
              });
            }
          } else {
            res.status(500).json({
              status: "Failed",
              message: "Some went wrong",
            });
          }
        }
      );
    } else {
      res.status(500).json({
        status: "Failed",
        message: "Some went wrong",
      });
    }
  });
};

exports.postSignIn = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        {
          email: req.body.email,
          userID: user.userID,
          username: user.username,
        },
        SECRET_KEY
      );
      res.status(200).json({
        status: "Success",
        token,
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Invalid Password! Please enter the correct password.",
      });
    }
  } else {
    res.status(400).json({
      status: "Failed",
      message: "User does not exist! Please register to continue.",
    });
  }
};
