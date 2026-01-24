import type { Document, Types } from "mongoose";

/**
 * Core User interface
 */
export interface IUser {
  // BASIC INFO
  userId: string;
  name: string;
  phone: string;
  email: string;
  password: string;

  userType: "customer" | "salon_owner";
  isActive: boolean;

  // PROFILE
  profile: {
    picture: string;
    gender: "male" | "female" | "other";
    dateOfBirth?: Date;
    age?: number;
  };
  dailyLoginCount: number;
  lastLoginDate: string;

  // ADDRESS
  address: {
    street?: string;
    area?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country: string;
    location?: {
      latitude?: number;
      longitude?: number;
    };
  };

  // PREFERENCES
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
      whatsapp: boolean;
      push: boolean;
    };
    language: "hindi" | "english";
    favoriteSalons: Types.ObjectId[];
    preferredServices: string[];
    preferredTimeSlots: string[];
  };
}

/**
 * Mongoose document type
 */
export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

