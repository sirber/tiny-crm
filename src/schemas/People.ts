import mongoose, { Document, Types } from "mongoose";

export enum PeopleType {
  contact = "contact",
  prospect = "prospect",
  customer = "customer",
}

export interface IBillProduct {
  productId: Types.ObjectId;
  price: number;
  quantity: number;
}

export interface IBill {
  taxes1: number;
  taxes2: number;
  total: number;
  products: IBillProduct[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IPeople {
  userId: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  type: PeopleType;
  bills: IBill[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IPeopleDocument extends IPeople, Document {}

export const billSchema = new mongoose.Schema(
  {
    taxes1: {
      type: Number,
      required: true,
    },
    taxes2: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
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

export const peopleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(PeopleType),
      required: true,
      default: PeopleType.contact,
    },
    bills: [billSchema],
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
