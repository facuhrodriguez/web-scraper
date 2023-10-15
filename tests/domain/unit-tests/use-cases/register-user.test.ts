import { RegisterUserParams, RegisterUserService, User, UserAlreadyExistsError } from "../../../../src/domain";
import { HashMock } from '../../mocks/hash.mock';
import { UserRepositoryMock, userAlreadyExist } from '../../mocks/user-repository.mock';

describe('Use case: Register User', () => {
    const hashMock = new HashMock();
    const userRepositoryMock = new UserRepositoryMock();
    const registerUser = new RegisterUserService(hashMock, userRepositoryMock, userRepositoryMock);
    const fakeUser: RegisterUserParams = {
        userName: 'facundo.rodriguez@gmail.com',
        password: 'encryptedPassword',
    }
    test('should register user successfully', async () => {
        const newUser: User = await registerUser.register(fakeUser)
        const encryptedPassword: string = await hashMock.hash(fakeUser.password);
        const encryptedPasswords: boolean = await hashMock.compare(newUser.password, encryptedPassword);
        expect(newUser).toHaveProperty('userName');
        expect(newUser.userName).toEqual(fakeUser.userName);
        expect(encryptedPasswords).toEqual(true);
    }, 50000)

    test('should throw an exception if the user already exists', async () => {
        await expect(registerUser.register(userAlreadyExist)).rejects.toThrowError(UserAlreadyExistsError);
    }, 50000)
})