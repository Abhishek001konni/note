const User = require("../models/User");
const TokenUtil = require("../utils/token");


// Sign up a new user
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = new User({ email, password });
    await user.save();

    const { accessToken, refreshToken } = TokenUtil.generateTokens(user._id);

    user.refreshToken.push({ token: refreshToken });
    await user.save();

    res.status(201).json({
      accessToken,
      refreshToken,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: "failed to create user",
      details: err.message,
    });
  }
};

// Login a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const { accessToken, refreshToken } = TokenUtil.generateTokens(user._id);

    user.refreshToken.push({ token: refreshToken });
    await user.save();

    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(400).json({
      error: "failed to login",
      details: err.message,
    });
  }
};

module.exports = { signup, login };
