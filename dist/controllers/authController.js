"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const register = async (req, res) => {
    const { email, password, username, firstname, lastname, phone, address } = req.body;
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
        const existingUser = await user_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        // Create new user
        await user_1.User.create({
            email,
            password,
            username,
            firstname,
            lastname,
            phone,
            address,
        });
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error?.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res
                .status(401)
                .json({ message: "Please enter Email and Password" });
        }
        const user = await user_1.User.findOne({ where: { email } });
        if (!user)
            return res.status(404).json({ error: "User not found" });
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ error: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({
            token,
            user: { id: user.id, email: user.email, name: user.username },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: error.message });
    }
};
exports.login = login;
