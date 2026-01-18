import { UserModel } from "../../models/users/user.model";
import { IUser } from "../../models/users/user.types";

export class UserService {
  static async createUser(data: IUser) {
    return await UserModel.create(data);
  }

  static async getAllUsers() {
    return await UserModel.find();
  }

  static async getUserById(userId: string) {
    return UserModel.findById(userId);
  }

  static async deleteUser(userId: string) {
    return await UserModel.findByIdAndDelete(userId);
  }
}
