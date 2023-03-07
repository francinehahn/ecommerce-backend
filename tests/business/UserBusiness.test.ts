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
    test("Should receive an input with no name and return a custom error", async () => {
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

    test("Should receive an input with an invalid email and return a custom error", async () => {
        expect.assertions(3)
        try {
            const input = {
                name: "Fernanda Monteiro",
                email: "teste",
                password: "123456"
            }

            await userBusiness.signup(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Invalid email.")
        }
    })

    test("Should receive an input with an invalid password and return a custom error", async () => {
        expect.assertions(3)
        try {
            const input = {
                name: "Fernanda Monteiro",
                email: "teste@teste.com",
                password: "123"
            }

            await userBusiness.signup(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The password must have at least 6 characters.")
        }
    })

    test("Should receive an email already registered and return a custom error", async () => {
        expect.assertions(3)
        try {
            const input = {
                name: "Fernanda Monteiro",
                email: "mariliapereira@gmail.com",
                password: "123456"
            }

            await userBusiness.signup(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Email already in use.")
        }
    })

    test("Should receive a valid input and return a token", async () => {
        const input = {
            name: "Fernanda Monteiro",
            email: "fernanda.monteiro@gmail.com",
            password: "123456"
        }

        const result = await userBusiness.signup(input)
        expect(result).toBe("token")
    })
})

describe("Testing the login endpoint", () => {
    test("Should receive an input with no password and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            email: "mariliapereira@gmail.com",
            password: ""
        }

        try {
            await userBusiness.login(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the password.")
        }
    })

    test("Should receive an email not registered and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            email: "mariliapereira@gmail",
            password: "123456"
        }

        try {
            await userBusiness.login(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Email not found.")
        }
    })

    test("Should receive an incorrect password and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            email: "mariliapereira@gmail.com",
            password: "123456789"
        }

        try {
            await userBusiness.login(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Incorrect password.")
        }
    })

    test("Should receive a valid input and return a token", async () => {
        
        const input = {
            email: "mariliapereira@gmail.com",
            password: "123456"
        }

        const result = await userBusiness.login(input)

        expect(result).toBe("token")
    })
})

describe("Testing the editUserInfo endpoint", () => {
    test("Should not receive a token and return a custom error", async () => {
        expect.assertions(3)
        
        const token = ""

        try {
            await userBusiness.getUserInfo(token)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the token.")
        }
    })

    test("Should not receive an incorrect token and return a custom error", async () => {
        expect.assertions(3)
        
        const token = "invalidToken"

        try {
            await userBusiness.getUserInfo(token)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })
})