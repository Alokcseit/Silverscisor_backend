import { validate as isUUID } from "uuid";
import { IUser } from "../models/users/user.types";

export class UserValidator {
  static validateCreate(data: Partial<IUser>) {
    if (!data.name || data.name.trim().length < 2) {
      throw new Error("Name must be at least 2 characters long");
    }

    if (!data.email) {
      throw new Error("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("Invalid email format");
    }

    if (!data.phone) {
      throw new Error("Phone number is required");
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(data.phone)) {
      throw new Error("Invalid phone number");
    }

    if (!data.password) {
      throw new Error("Password is required");
    }

    if (data.password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
  }

  static validateUUID(userId: string) {
    if (!isUUID(userId)) {
      throw new Error("Invalid userId");
    }
  }
}
