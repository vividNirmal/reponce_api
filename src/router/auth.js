const express = require("express");
const User = require("../schema/user");
const route = express.Router();

route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false
      });
    }

    res.status(200).json({
      message: "User logged in successfully",            
      success: true
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false
    });
  }
});
route.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false
      });
    }
    const newUser = new User({
      email,
      username,
      password
    });
    await newUser.save();
    res.status(200).json({
      message: "User registered successfully",
      user: newUser,
      success: true
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false
    });
  }
});

route.get("/", (req, res) => {
  User.find()
    .then(result => {
      res.status(200).json({
        message: "Users fetched successfully",
        users: result,
        success: true
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        success: false
      });
    });
});

route.put("/:id", (req, res) => {
  const { name, email, password } = req.body;
  User.findByIdAndUpdate(req.params.id, {
    name,
    email,
    password
  })
    .then(result => {
      res.status(200).json({
        message: "User updated successfully",
        user: result,
        success: true
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        success: false
      });
    });
});
route.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(200).json({
        message: "User deleted successfully",
        user: result,
        success: true
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        success: false
      });
    });
});
module.exports = route;
