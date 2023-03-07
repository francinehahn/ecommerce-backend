import { IhashManager } from "../../src/models/IhashManager"


export class HashManagerMock implements IhashManager {
    public generateHash = jest.fn(async (plaintext: string) => {
        return "hash"
    }) 

    public compareHash = jest.fn(async (plaintext: string, hashText: string) => {
        return plaintext === hashText
    })
}