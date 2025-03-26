import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";
import asyncHandler from "express-async-handler";

export interface AuthRequest extends Request {
  user?: { id: string; isAdmin?: boolean };
}

// Protect Middleware (Requires Valid Token)
export const protect = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];

      console.log("🔑 Token received:", token); // Log token

      try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

          const user: IUser | null = await User.findById(decoded.id).select("-password");

          if (!user) {
              res.status(401);
              throw new Error("Not authorized, user not found");
          }

          req.user = { id: user._id.toString(), isAdmin: user.isAdmin ?? false };

          console.log("✅ User authenticated:", req.user); // Log user details

          next();
      } catch (error) {
          console.error("❌ Invalid Token:", error);
          res.status(401);
          throw new Error("Not authorized, token failed");
      }
  } else {
      console.warn("No token provided");
      res.status(401);
      throw new Error("Not authorized, no token provided");
  }
});



// ✅ Middleware to Check Admin Role
export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only" });
  }
};
