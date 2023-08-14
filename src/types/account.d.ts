import { Iuser } from "./user";
export interface Account {
  id: string;
  balance: number;
  accountNumber: number;
  user: Iuser;
  userId: Iuser["id"];
  createdAt: Date;
  updatedAt: Date;
}
