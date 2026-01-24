import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const salonOwnerMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.userType !== "salon_owner") {
    return res.status(403).json({ message: "Salon owner access only" });
  }
  next();
};
