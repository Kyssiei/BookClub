import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";

export interface AuthRequest extends Request {
  user?: { id: string; isAdmin?: boolean };
}

// Protect Middleware (Requires Valid Token)
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

      // Explicitly type `user` as `IUser | null`
      const user: IUser | null = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      // Ensure _id is always a string & isAdmin is recognized
      req.user = { id: user._id.toString(), isAdmin: user.isAdmin ?? false };

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

// ✅ Middleware to Check Admin Role
export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only" });
  }
};
