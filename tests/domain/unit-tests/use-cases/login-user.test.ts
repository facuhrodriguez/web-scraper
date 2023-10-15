import { IncorrectUserPassword, LoginUserService, UserAuthenticated, UserLogin, UserNotExist } from "../../../../src/domain";
import { EncrypterMock } from "../../mocks/encrypter.mock"
import { HashMock } from "../../mocks/hash.mock";
import { UserRepositoryMock, notExistingUser, invalidUserPassword, userAlreadyExist } from "../../mocks/user-repository.mock";

describe('Use case: Login User', () => {
    const encryptMock = new EncrypterMock();
    const userRepositoryMock = new UserRepositoryMock();
    const hashMock = new HashMock();
    const loginUserService = new LoginUserService(userRepositoryMock, hashMock, encryptMock);
    const userToLogin: UserLogin = userAlreadyExist;
    const invalidUserPwd: UserLogin = invalidUserPassword;
    const invalidUser: UserLogin = notExistingUser;
    test('should login user successfully', async () => {
        const userAuthenticated: UserAuthenticated = await loginUserService.login(userToLogin);
        expect(userAuthenticated).toHaveProperty('accessToken');
        expect(userAuthenticated.userName).toEqual(userAlreadyExist.userName);
    }, 50000)

    test('should throw an error if the password is incorrect', async () => {
        await expect(loginUserService.login(invalidUserPwd)).rejects.toThrowError(IncorrectUserPassword);
    }, 50000)

    test('should throw an error if the user does not exist', async () => {
        await expect(loginUserService.login(invalidUser)).rejects.toThrowError(UserNotExist);
    }, 50000)
})  