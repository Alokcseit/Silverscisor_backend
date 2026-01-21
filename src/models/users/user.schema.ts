import { Schema, Types } from "mongoose";
import type { IUserDocument } from "./user.types";

const UserSchema = new Schema<IUserDocument>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      immutable: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    userType: {
      type: String,
      enum: ["customer", "salon_owner"],
      default: "customer",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // PROFILE
    profile: {
      picture: {
        type: String,
        default: "",
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "male",
      },
      dateOfBirth: {
        type: Date,
      },
      age: {
        type: Number,
      },
    },

    // ADDRESS
    address: {
      street: String,
      area: String,
      city: String,
      state: String,
      pincode: String,
      country: {
        type: String,
        default: "India",
      },
      location: {
        latitude: Number,
        longitude: Number,
      },
    },

    preferences: {
      notifications: {
        email: {
          type: Boolean,
          default: true,
        },
        sms: {
          type: Boolean,
          default: true,
        },
        whatsapp: {
          type: Boolean,
          default: true,
        },
        push: {
          type: Boolean,
          default: true,
        },
      },

      language: {
        type: String,
        enum: ["hindi", "english"],
        default: "hindi",
      },
      preferredServices: [String],
      preferredTimeSlots: [String],
    },
  },
  {
    timestamps: true,
  },
);

export default UserSchema;
