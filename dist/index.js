"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
// * Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "1gb" }));
app.use((0, express_fileupload_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/user", user_1.default);
app.use("/api/auth", auth_1.default);
app.get("/", (req, res) => {
    return res.send("It's working 🙌");
});
const startServer = async () => {
    try {
        await (0, database_1.connectToDatabase)();
        const server = app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to connect to the database:", error.message);
        process.exit(1);
    }
};
startServer();
