import { Unauthorized } from "../../src/errors/UserErrors"
import { Iauthenticator } from "../../src/models/Iauthenticator"


export class AuthenticatorMock implements Iauthenticator {
    public generateToken = jest.fn(() => {
        return "token"
    })

    public getTokenData = jest.fn((token: string) => {
        if (token !== "token") {
            throw new Unauthorized()
        }
        
        return {id: "id"}
    })
}