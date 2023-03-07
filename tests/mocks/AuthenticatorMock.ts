import { Iauthenticator } from "../../src/models/Iauthenticator"


export class AuthenticatorMock implements Iauthenticator {
    public generateToken = jest.fn(() => {
        return "token"
    })

    public getTokenData = jest.fn(() => {
        return {id: "id"}
    })
}