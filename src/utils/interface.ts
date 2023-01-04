export interface Iuser {
  id?:number;
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
}

export interface Iaccount {
  id?: number;
  userId?: number;
  balance: number;
}

export interface Ifood {
  id?: number;
  price?: number;
  foodType?: string;
  description?: string;
  vendor?: Iuser;
}

export interface Irestaurant {
  id?:number;
  name?: string;
  state?: string;
  city?: string;
  address?: string;
  description?: string;
  isOpen?: boolean;
}

export interface Idelivery {
  id?:number;
  status: string;
  message: string;
}

export interface Icart {
  id?:number;
  userId?: Iuser;
  product?: [string];
  bill?: number;
}

export interface Iorder {
  id?:number;
  owner?: Iuser;
  item?: [any];
  totalAmount?: number;
  paidAmount?: number;
  canceledAt?:Date;
  orderDate?: Date;
  orderStatus?: string;
  remark?: string;
}
