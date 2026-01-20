import type { Request, Response } from "express";
import { UserService } from "../../services/users/user.service";

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      if (typeof req.body.preferences?.favoriteSalons === "string") {
        req.body.preferences.favoriteSalons = JSON.parse(
          req.body.preferences.favoriteSalons,
        );
      }

      const user = await UserService.createUser(req.body);

      return res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      console.error("Create user failed:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  }
  static async getAllUsers(req: Request, res: Response) {
    try {
      const user = await UserService.getAllUsers();

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      console.error(" user fetching is failed:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  }
}
