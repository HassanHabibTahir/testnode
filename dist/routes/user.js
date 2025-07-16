"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../middleware/user");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.get("/profile", user_1.authenticateToken, userController_1.getProfile);
router.put("/profile", user_1.authenticateToken, userController_1.updateProfile);
router.put("/change-password", user_1.authenticateToken, userController_1.changePassword);
exports.default = router;
