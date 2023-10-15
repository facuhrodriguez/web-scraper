export type User = {
  _id: string;
  userName: string;
  password: string;
  createdAt?: Date | number;
};

export type RegisterUserParams = Omit<User, '_id'>;
