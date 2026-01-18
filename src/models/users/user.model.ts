import { model } from "mongoose";
import type { IUserDocument } from "./user.types";
import UserSchema from "./user.schema";

export const UserModel = model<IUserDocument>("User", UserSchema);
