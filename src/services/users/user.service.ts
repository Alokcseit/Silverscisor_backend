import { UserModel } from "../../models/users/user.model";
import { IUser } from "../../models/users/user.types";
import { hashPassword } from "../../utils/password.util";
import { v4 as uuidv4 } from "uuid";
import { UserValidator } from "../../utils/user.validator";
import { ApiError } from "../../utils/error.utls";

export class UserService {
  static async createUser(data: IUser) {
    UserValidator.validateCreate(data);

    const existingUser = await UserModel.findOne({
      $or: [{ email: data.email }, { phone: data.phone }],
    });

    if (existingUser) {
      throw new ApiError("Account already exists", 409);
    }
    const hashedPassword = await hashPassword(data.password);
    return UserModel.create({
      ...data,
      userId: uuidv4(),
      password: hashedPassword,
    });
  }

  static async getUserById(userId: string) {
    UserValidator.validateUUID(userId);
    return UserModel.findOne({ userId }).select("+password");
  }

  static async getAllUsers() {
    return UserModel.find().select("-password");
  }

  static async deleteUser(userId: string) {
    UserValidator.validateUUID(userId);
    return UserModel.findOneAndDelete({ userId });
  }
}
