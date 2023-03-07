export interface IhashManager {
    generateHash (plaintext: string): Promise<string>
    compareHash (plaintex: string, hashtext: string): Promise<boolean>
}