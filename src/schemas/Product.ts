import mongoose, { Document, Types } from 'mongoose';

export interface IProduct {
  userId: Types.ObjectId;
  name: string;
  code: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IProductDocument extends IProduct, Document {}

export const productSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
}); 