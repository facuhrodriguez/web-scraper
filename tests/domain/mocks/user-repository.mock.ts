import { IAddUserRepository, IGetUserRepository, RegisterUserParams, User } from "../../../src/domain";

export const userAlreadyExist: User = {
    password: 'password123',
    userName: 'rodriguezfacundohernan@gmail.com',
}

export const invalidUserPassword: User = {
    password: 'passwordInvalid',
    userName: 'rodriguezfacundohernan@gmail.com',
}

export const notExistingUser: User = {
    password: 'password123',
    userName: 'usernotexist@gmail.com',
}

export const validUser: User = {
    password: 'password123',
    userName: 'rodriguezfacundohernan@gmail.com',
}

export class UserRepositoryMock implements IGetUserRepository, IAddUserRepository {



    addUserRepository(data: RegisterUserParams): Promise<User> {
        const newUser: User = {
            ...data
        }
        return Promise.resolve(newUser);
    }

    getUserByUsername(userEmail: string): Promise<User> {
        if (userEmail === userAlreadyExist.userName) return Promise.resolve(userAlreadyExist);
        return null;
    }
}