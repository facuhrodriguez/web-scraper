import { IEncrypt } from "../../../src/domain";

export class EncrypterMock implements IEncrypt {
    encrypt(text: object): string {
        const mockEncrypter: jest.Mock = jest.fn();
        const value: jest.Mock<string> = mockEncrypter.mockResolvedValue(`encryptedText${text}`);
        return value.toString();
    }
}