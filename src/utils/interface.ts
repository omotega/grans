export interface Iuser {
  id?: string;
  name: string;
  password: string;
  email: string;
  active?: boolean;
  verified?: boolean;
  photo?: string;
  role?: string;
  phone: number;
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
  reference: string;
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

export interface Itransaction {
  id?: number;
  txnType?: string;
  purpose?: string;
  amount?: number;
  accountId?: number;
  reference?: string;
  balanceBefore?: number;
  balanceAfter?: number;
  metadata?: object;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IcardTransaction {
  id?: number;
  externalReference?: string;
  accountId?: number;
  amount?: number;
  lastResponse?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Icard {
  accountid?: number;
  pan?: string;
  expiry_year?: string;
  expiry_month?: string;
  cvv?: string;
  email?: string;
  amount?: number;
}
