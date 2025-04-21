import mongoose, { Document, Types } from "mongoose";

export enum UserRole {
  user = "user",
  admin = "admin",
}

export interface IUser {
  email: string;
  name: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
}

export const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.user,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
