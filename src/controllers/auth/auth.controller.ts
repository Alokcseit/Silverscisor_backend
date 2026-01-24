import { Request, Response } from "express";
import { AuthService } from "../../services/auth/auth.service";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, phone, password } = req.body;
      // Validation
      if ((!email && !phone) || !password) {
        return res.status(400).json({
          success: false,
          message: "Email or phone and password are required",
        });
      }

      const identifier = email || phone;

      const result = await AuthService.login(identifier, password);
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: error.message || "Login failed",
      });
    }
  }

  static async logout(_req: Request, res: Response) {
    // Stateless logout (JWT)
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  }
}
