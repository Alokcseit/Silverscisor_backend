import type { Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
}

/**
 * Mongoose document type
 */
export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}
