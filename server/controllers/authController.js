import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc   Register a new user
// @route  POST /api/auth/register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "An account with this email already exists" });
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
};

// @desc   Login user
// @route  POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  }

  res.status(401).json({ message: "Invalid email or password" });
};

// @desc   Get current logged-in user profile
// @route  GET /api/auth/profile
export const getProfile = async (req, res) => {
  res.json(req.user);
};

// @desc   Update profile (name, address)
// @route  PUT /api/auth/profile
export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.address = req.body.address || user.address;
  if (req.body.password) user.password = req.body.password;

  const updated = await user.save();
  res.json({
    _id: updated._id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
    address: updated.address,
  });
};
