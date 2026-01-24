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
  static async getUserById(req: Request<{ userId: string }>, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required",
        });
      }

      const user = await UserService.getUserById(userId);

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      console.error("User fetching failed:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  }
  static async deleteUser(req: Request<{ userId: string }>, res: Response) {
    try {
      const { userId } = req.params;

      const deletedUser = await UserService.deleteUser(userId);

      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error: any) {
      console.error("User deletion failed:", error);

      return res.status(400).json({
        success: false,
        message: error.message || "Failed to delete user",
      });
    }
  }
}
