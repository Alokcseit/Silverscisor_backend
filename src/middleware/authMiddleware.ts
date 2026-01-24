import { Request, Response, NextFunction } from "express";
import { TokenPayload, verifyToken } from "../utils/auth.util";

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

class AuthMiddlewareClass {
  handle(allowedRoles: Array<TokenPayload["userType"]> = []) {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
      console.log("➡️ authMiddleware HIT");

      const authHeader = req.headers.authorization;
      const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Token missing",
        });
      }

      try {
        const decoded = verifyToken(token);
        req.user = decoded;

        if (
          allowedRoles.length > 0 &&
          !allowedRoles.includes(decoded.userType)
        ) {
          return res.status(403).json({
            success: false,
            message: "Forbidden",
          });
        }

        console.log("Token verified, calling next()");
        return next();
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token",
        });
      }
    };
  }
}

export const authMiddleware = (roles: Array<TokenPayload["userType"]> = []) =>
  new AuthMiddlewareClass().handle(roles);
