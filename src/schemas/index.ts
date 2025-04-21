import { UserRole, IUser, IUserDocument, userSchema } from './User';
import { PeopleType, IPeople, IPeopleDocument, IBill, IBillProduct, peopleSchema, billSchema } from './People';
import { IProduct, IProductDocument, productSchema } from './Product';

export {
  UserRole,
  PeopleType
};

export type {
  IUser,
  IUserDocument,
  IPeople,
  IPeopleDocument,
  IBill,
  IBillProduct,
  IProduct,
  IProductDocument
};

export {
  userSchema,
  peopleSchema,
  billSchema,
  productSchema
}; 