enum Role {
  USER,
  ADMIN,
}

export interface Iuser {
  id: string;
  email: string;
  name: string;
  password: string;
  profilePicture: string;
  accountNumber: string;
  phoneNumber: number;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
