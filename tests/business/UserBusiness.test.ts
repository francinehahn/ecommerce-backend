import { UserBusiness } from "../../src/business/UserBusiness"
import { CustomError } from "../../src/errors/CustomError"
import { AuthenticatorMock } from "../mocks/AuthenticatorMock"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import UserDatabaseMock from "../mocks/UserDatabaseMock"


const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new HashManagerMock(),
    new AuthenticatorMock(),
    new IdGeneratorMock()
)

describe("Testing the signup endpoint", () => {
    test("Should receive incomplete information and return a custom error", async () => {
        expect.assertions(3)
        try {
            const input = {
                name: "",
                email: "teste@teste.com",
                password: "123456"
            }

            await userBusiness.signup(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the user name.")
        }
    })
})

describe("Testing the login endpoint", () => {
    
})

describe("Testing the editUserInfo endpoint", () => {
    
})

describe("Testing the theUserBy endpoint", () => {
    
})