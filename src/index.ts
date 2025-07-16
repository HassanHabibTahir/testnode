import express, { Application, Request, Response } from "express";
import fileUpload  from "express-fileupload";
import "dotenv/config";
import cors from "cors";
import auth from "./routes/auth";
import user from "./routes/user"

import { connectToDatabase } from "./config/database";
const app: Application = express();
const PORT = process.env.PORT || 8000;

// * Middleware
app.use(cors());
app.use(express.json({ limit: "1gb" }));
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
// app.use("/api/user", user);
// app.use("/api/auth",auth)
app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});
const startServer = async () => {
  try {
    await connectToDatabase();
   const server =  app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1); 
  }
};
startServer();
