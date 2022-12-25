export interface Iuser {
  id?: string;
  name: string;
  password: string;
  email: string;
  active?: string;
  photo?: string
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomRequest {
  user: Iuser
  file: object,
  params: object,
  query: object,
  path: object;
}

export interface Iotp {
  id?: number;
  email: string;
  token: number;
  expired: boolean;
}

export interface Iaccount {
  id: number,
  wallet_id: string,
  user_id: number;
  balance: number;
}

