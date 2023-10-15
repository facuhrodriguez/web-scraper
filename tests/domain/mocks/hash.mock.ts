import { IHashCompare, IHashRepository } from "../../../src/domain";

export class HashMock implements IHashRepository, IHashCompare {
    hash(text: string): Promise<string> {
        return Promise.resolve(`encryptedpassword${text}`)
    }

    compare(text: string, verify: string): Promise<boolean> {
        return Promise.resolve(verify === text)

    }
}