const router = require("express").Router();
const { Router } = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// User registration

router.post("/register", async (req, res) => {
  try {
    // check if  user exist or not

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already Exists", success: false });
    }

    // hash password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;

    // create new User :-

    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "User created succesfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// login panel :-

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(200)
        .send({ msg: "User doesn't exist", success: false });
    }

    // Check password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(500).send({
        msg: "Invalid password",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.send({
      msg: "User login successfully",
      success: true,
      data: token,
    });
  } catch (error) {
    return res.status(500).send({
      msg: error.message,
      success: false,
    });
  }
});

// get-user-Info :-

router.post("/get-user-info", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      mesg: "User info fetched succesfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      mesg: error.message,
      data: error,
      success: false,
    });
  }
});

module.exports = router;
