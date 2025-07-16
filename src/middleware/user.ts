import jwt from "jsonwebtoken";
import { promisify } from "util";
const verifyToken = promisify(jwt.verify);
export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");
  try {
    const decoded = await verifyToken(token, process.env.JWT_SECRET);
      req.user = decoded;
    next();
  } catch (err) {
    res.status(403).send("Invalid Token");
  }
};
