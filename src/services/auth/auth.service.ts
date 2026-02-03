import bcrypt from "bcryptjs";
import { createHash, randomBytes } from "crypto";
import { UserModel } from "../../models/users/user.model";
import { generateToken } from "../../utils/auth.util";
import { IUser } from "../../models/users/user.types";
import { sendEmail } from "../../utils/sendEmail.util";

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
  static async forgotPassword(email: string): Promise<void> {
    const user = await UserModel.findOne({ email });
    if (!user) return; // security best practice

    const resetToken = randomBytes(32).toString("hex");

    user.resetPasswordToken = createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Your Password",
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    });
  }

  // =========================
  // RESET PASSWORD
  // =========================
  static async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<void> {
    const hashedToken = createHash("sha256").update(token).digest("hex");

    const user = await UserModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new Error("Token is invalid or expired");
    }

    const saltRounds = 10;
    user.password = await bcrypt.hash(newPassword, saltRounds);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
  }
}

