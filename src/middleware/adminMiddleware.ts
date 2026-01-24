import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export class AdminMiddleware {
  handle(req: AuthRequest, res: Response, next: NextFunction) {
    if (req.user?.userType !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }
    return next();
  }
}

export const adminMiddleware = new AdminMiddleware().handle.bind(
  new AdminMiddleware(),
);
