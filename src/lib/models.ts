import connectDB from './database';
import { IUserDocument, userSchema } from '@/schemas/User';
import { IPeopleDocument, peopleSchema } from '@/schemas/People';
import { IProductDocument, productSchema } from '@/schemas/Product';
import { Model } from 'mongoose';

export async function getUserModel(): Promise<Model<IUserDocument>> {
  const mongoose = await connectDB();
  try {
    return mongoose.model<IUserDocument>('User');
  } catch {
    return mongoose.model<IUserDocument>('User', userSchema);
  }
}

export async function getPeopleModel(): Promise<Model<IPeopleDocument>> {
  const mongoose = await connectDB();
  try {
    return mongoose.model<IPeopleDocument>('People');
  } catch {
    return mongoose.model<IPeopleDocument>('People', peopleSchema);
  }
}

export async function getProductModel(): Promise<Model<IProductDocument>> {
  const mongoose = await connectDB();
  try {
    return mongoose.model<IProductDocument>('Product');
  } catch {
    return mongoose.model<IProductDocument>('Product', productSchema);
  }
} 