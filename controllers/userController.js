//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// @desc    Register new user
// @route   POST /api/users/
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(400);
    throw new Error("Pls fill out all fields");
  }

  // Check if user's email is unique

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "Email already exists" });
  }

  // Hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a user

  const user = await User.create({
    username,
    password: hashedPassword,
    email,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user" });
  }
});

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private

const getMe = asyncHandler(async (req, res) => {
  const { _id, username, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    username,
    email,
  });
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findByIdAndUpdate(
    userId,
    { token: null },
    { new: true }
  );
  res.status(200).json({ message: "User logged out" });
});

// Generate Token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "40d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
};
