import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userRoute from "../routes/auth";
import { User } from "../models/user";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  const { email, password, username, firstname, lastname, phone, address } =
    req.body;

  // Input validation
  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ error: "All fields (email, password) are required" });
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Password length validation
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create new user
    await User.create({
      email,
      password,
      username,
      firstname,
      lastname,
      phone,
      address,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "Please enter Email and Password" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.username },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
};
