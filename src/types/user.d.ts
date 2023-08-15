import { Account } from "./account";

export enum Role {
  USER,
  ADMIN,
}

export interface Iuser {
  id: string;
  email: string;
  name: string;
  password: string;
  profilePicture: string | null;
  phoneNumber: string;
  role: string;
  verified: boolean;
  account?: Account;
  createdAt: Date;
  updatedAt: Date;
}
