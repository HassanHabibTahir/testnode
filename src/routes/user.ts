import express from "express";
import { authenticateToken } from "../middleware/user";
import { changePassword, getProfile, updateProfile } from "../controllers/userController";
const router = express.Router();

router.get("/profile", authenticateToken, getProfile);
router.put("/profile", authenticateToken, updateProfile);
router.put("/change-password", authenticateToken, changePassword);

export default router;
