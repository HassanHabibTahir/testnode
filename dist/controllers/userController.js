"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateProfile = exports.getProfile = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user");
// GET /profile
const getProfile = async (req, res) => {
    try {
        const id = req.user?.id;
        if (!id)
            return res.status(400).json({ error: "User ID not found in token." });
        const user = await user_1.User.findByPk(id);
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getProfile = getProfile;
// PUT /profile
const updateProfile = async (req, res) => {
    try {
        const id = req.user?.id;
        if (!id)
            return res.status(400).json({ error: "User ID not found in token." });
        const user = await user_1.User.findByPk(id);
        if (!user)
            return res.status(404).json({ error: "User not found." });
        const { firstName, lastName, address, phone, username } = req.body;
        if (firstName !== undefined)
            user.firstname = firstName;
        if (lastName !== undefined)
            user.lastname = lastName;
        if (address !== undefined)
            user.address = address;
        if (phone !== undefined)
            user.phone = phone;
        if (username !== undefined)
            user.username = username;
        await user.save();
        res.json({ message: "Profile updated successfully", user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateProfile = updateProfile;
// PUT /change-password
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await user_1.User.findByPk(req.user?.id, {
            attributes: ["id", "password"],
        });
        if (!user)
            return res.status(404).json({ error: "User not found." });
        const isMatch = await bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isMatch)
            return res.status(400).json({ error: "Current password is incorrect" });
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        await user.update({ password: hashedPassword });
        res.json({ message: "Password changed successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.changePassword = changePassword;
