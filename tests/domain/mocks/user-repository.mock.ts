import { IAddUserRepository, IGetUserRepository, RegisterUserParams, User } from "../../../src/domain";

export const userAlreadyExist: User = {
    password: 'password123',
    userName: 'facundo.rodriguez1@gmail.com',
    _id: '123',
}

export class UserRepositoryMock implements IGetUserRepository, IAddUserRepository {



    addUserRepository(data: RegisterUserParams): Promise<User> {
        const newUser: User = {
            _id: '1234',
            ...data
        }
        return Promise.resolve(newUser);
    }

    getUserByUsername(userEmail: string): Promise<User> {
        if (userEmail === userAlreadyExist.userName) return Promise.resolve(userAlreadyExist);
        return null;
    }
}