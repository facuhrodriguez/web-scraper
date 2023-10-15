export type User = {
  userName: string;
  password: string;
  createdAt?: Date | number;
};

export type RegisterUserParams = {
  userName: string;
  password: string;
};

export type UserLogin = {
  userName: string;
  password: string;
};
