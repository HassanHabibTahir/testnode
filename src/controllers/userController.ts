import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user";

// GET /profile
export const getProfile = async (req: any, res: Response) => {
  try {
    const id = req.user?.id;
    if (!id) return res.status(400).json({ error: "User ID not found in token." });
    const user = await User.findByPk(id);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /profile
export const updateProfile = async (req: any, res: Response) => {
  try {
    const id = req.user?.id;
    if (!id) return res.status(400).json({ error: "User ID not found in token." });
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found." });
    const { firstname, lastname, address, phone, username } = req.body;
    if (firstname !== undefined) user.firstname = firstname;
    if (lastname !== undefined) user.lastname = lastname;
    if (address !== undefined) user.address = address;
    if (phone !== undefined) user.phone = phone;
    if (username !== undefined) user.username = username;

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /change-password
export const changePassword = async (req: any, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findByPk(req.user?.id, {
      attributes: ["id", "password"],
    });
    if (!user) return res.status(404).json({ error: "User not found." });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    res.json({ message: "Password changed successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
