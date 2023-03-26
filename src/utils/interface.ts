export interface Iuser {
  id?: number;
  name: string;
  password: string;
  email: string;
  active?: boolean;
  verified?: boolean;
  photo?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Isession {
  id?: string;
  user: Iuser["id"];
  valid?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomRequest {
  User: Iuser;
  file: object;
  params: object;
  query: object;
  path: object;
}

export interface Iotp {
  id?: number;
  email: string;
  token: string;
  expiry_time?: Date;
  expired?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Iaccount {
  id?: number;
  userId?: number;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Ifood {
  id?: number;
  price?: number;
  foodType?: string;
  description?: string;
  vendor?: Iuser;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Irestaurant {
  id?: number;
  name?: string;
  state?: string;
  city?: string;
  address?: string;
  description?: string;
  isOpen?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Idelivery {
  id?: number;
  status: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Icart {
  id?: number;
  userId?: Iuser;
  product?: [string];
  bill?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Iorder {
  id?: number;
  owner?: Iuser;
  item?: [any];
  totalAmount?: number;
  paidAmount?: number;
  canceledAt?: Date;
  orderDate?: Date;
  orderStatus?: string;
  remark?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Itransaction {
  id?: number;
  txnType?: string;
  transactions?: string;
  amount?: number;
  accountId?: number;
  reference?: string;
  balanceBefore?: number;
  balanceAfter?: number;
  metadata?: object;
  createdAt?: Date;
  updatedAt?: Date;
}
