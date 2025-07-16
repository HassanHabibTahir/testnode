import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;

// import prisma from "../config/database";
// import { Router } from "express";
// import { UploadedFile } from "express-fileupload";
// import { getStoragePath } from "../config/storage";
  // import jwt from "jsonwebtoken";
// import { authenticateToken } from "../middleware/user";
// export const userRoute = Router();
// const bcrypt = require("bcryptjs");
// userRoute.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email already exists" });
//     }
//     let file;
//     if (req) {
//       file = req.files?.profileImage as UploadedFile;
//       let storagePath = getStoragePath(file);
//       await file.mv(storagePath);
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//         profileImage: file.name,
//       },
//     });
//     res.status(201).json({ user });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// userRoute.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
 
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user)
//       return res.status(400).send({ error: "Email or password is wrong" });
//     const validPass = await bcrypt.compare(password, user.password);
//     if (!validPass) return res.status(400).send({ error: "Invalid password" });
//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
//     res.status(200).json({ token ,user});
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// userRoute.get("/", authenticateToken, async (req, res) => {
//   try {
//     const users = await prisma.user.findMany({
//       where: {
//         id: {
//           not: req.user.id,
//         },
//       },
//     });
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// // use Router get current User
// userRoute.get("/user", authenticateToken, async (req, res) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: req.user.id },
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

