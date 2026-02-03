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
  // =========================
  // FORGOT PASSWORD
  // =========================
  static async forgotPassword(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;
      console.log(email);
      if (!email) {
        return res.status(400).json({
          message: "Email is required",
        });
      }

      await AuthService.forgotPassword(email);

      // Always return success (security best practice)
      return res.status(200).json({
        message: "Reset link is sent in your email, please check",
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Forgot password failed",
      });
    }
  }

  // =========================
  // RESET PASSWORD
  // =========================
  static async resetPassword(req: Request, res: Response): Promise<Response> {
    try {
      const { token } = req.params;
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      if (!token || Array.isArray(token)) {
        return res.status(400).json({
          message: "Invalid or missing reset token",
        });
      }

      await AuthService.resetPassword(token, password);

      return res.status(200).json({
        message: "Password reset successful",
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Reset password failed",
      });
    }
  }
}
