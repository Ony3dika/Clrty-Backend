import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
  try {
    let token;
    // Bet token from `Bearer <token> in auth headers `
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    // Find user in database
    const user = await User.findById(decoded.userId);
    if (!user)
      return res.status(401).json({ success: false, message: "Unauthorizzed" });

    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, error: error.message, message: "Unauthorized" });
  }
};

export default authorize;
