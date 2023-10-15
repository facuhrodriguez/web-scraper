export type User = {
  _id?: string;
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

export type UserPayload = {
  user: {
    userName: string;
    userId: string;
  };
};
