import bcrypt from "bcryptjs";
import { UserModel } from "../../models/users/user.model";
import { generateToken } from "../../utils/auth.util";

const MAX_DAILY_LOGINS = 10;

export class AuthService {
  static async login(identifier: string, password: string) {
    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    }).select("+password");

    if (!user) {
      throw new Error("Invalid email/phone or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email/phone or password");
    }

    const today = new Date().toISOString().split("T")[0];

    // DAILY LOGIN LIMIT
    if (
      user.lastLoginDate === today &&
      user.dailyLoginCount >= MAX_DAILY_LOGINS
    ) {
      throw new Error("Daily login limit reached (10). Try again tomorrow.");
    }

    // DAILY LOGIN COUNT UPDATE
    if (user.lastLoginDate === today) {
      user.dailyLoginCount += 1;
    } else {
      user.dailyLoginCount = 1;
      user.lastLoginDate = today;
    }

    await user.save();

    const token = generateToken({
      userId: user.userId,
      userType: user.userType,
    });

    return {
      token,
      user: {
        userId: user.userId,
        username: user.name,
        profilePicture: user.profile.picture,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        dailyLoginCount: user.dailyLoginCount,
      },
    };
  }

  static async logout(): Promise<void> {
    return;
  }
}
