import { PurchaseBusiness } from "../../src/business/PurchaseBusiness"
import { CustomError } from "../../src/errors/CustomError"
import { AuthenticatorMock } from "../mocks/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import ProductDatabaseMock from "../mocks/ProductDatabaseMock"
import PurchaseDatabaseMock from "../mocks/PurchaseDatabaseMock"


const purchaseBusiness = new PurchaseBusiness(
    new PurchaseDatabaseMock(),
    new ProductDatabaseMock(),
    new AuthenticatorMock(),
    new IdGeneratorMock()
)

describe("Testing the getPurchaseByUserId endpoint", () => {
    test("Should not receive the token and return a custom error", async () => {
        expect.assertions(3)
        
        try {
            await purchaseBusiness.getPurchasesByUserId("")
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the token.")
        }
    })

    test("Should receive an invalid token and return a custom error", async () => {
        expect.assertions(3)
        
        try {
            await purchaseBusiness.getPurchasesByUserId("invalidToken")
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })

    test("Should receive a valid token and return a custom error", async () => {
        expect.assertions(3)
        
        try {
            await purchaseBusiness.getPurchasesByUserId("token")
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("This user has not made any purchases yet.")
        }
    })
})

describe("Testing the createPurchase endpoint", () => {
    test("Should receive an invalid token and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            products: [{productId: 1, quantity: 1}],
            token: "invalidToken"
        }

        try {
            await purchaseBusiness.createPurchase(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })
    
    test("Should receive product ids that don't exist and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            products: [{productId: 10, quantity: 1}, {productId: 22, quantity: 2}],
            token: "token"
        }

        try {
            await purchaseBusiness.createPurchase(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Product not found.")
        }
    })

    test("Should receive a negative quantity and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            products: [{productId: 1, quantity: 1}, {productId: 2, quantity: -2}],
            token: "token"
        }

        try {
            await purchaseBusiness.createPurchase(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The product quantity cannot be less than or equal to zero.")
        }
    })

    test("Should receive a valid input and not return a custom error", async () => {
        const input = {
            products: [{productId: 1, quantity: 1}, {productId: 2, quantity: 2}],
            token: "token"
        }

        const result = await purchaseBusiness.createPurchase(input)
        expect(result).not.toBeDefined()
    })
})

describe("Testing the getSalesByUserId endpoint", () => {
    test("Should not receive the token and return a custom error", async () => {
        expect.assertions(3)

        try {
            await purchaseBusiness.getSalesByUserId("")
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the token.")
        }
    })

    test("Should receive an invalid token and return a custom error", async () => {
        expect.assertions(3)

        try {
            await purchaseBusiness.getSalesByUserId("invalidToken")
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })

    test("Should receive a valid token and return a NoSalesFound custom error", async () => {
        expect.assertions(3)

        try {
            await purchaseBusiness.getSalesByUserId("token")
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("This user has not made any sales yet.")
        }
    })
})