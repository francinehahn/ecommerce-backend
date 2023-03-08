import { ProductBusiness } from "../../src/business/ProductBusiness"
import { CustomError } from "../../src/errors/CustomError"
import { inputCreateProductDTO, inputEditProductInfoDTO, inputGetAllProductsDTO, productOrder } from "../../src/models/Product"
import { AuthenticatorMock } from "../mocks/AuthenticatorMock"
import ProductDatabaseMock from "../mocks/ProductDatabaseMock"


const productBusiness = new ProductBusiness(new ProductDatabaseMock(), new AuthenticatorMock())

describe("Testing the getProductsByUserId endpoint", () => {
    test("Should not receive the token and return a custom error", async () => {
        expect.assertions(3)

        try {
            await productBusiness.getProductsByUserId("")
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the token.")
        }
    })

    test("Should receive an invalid token and return a custom error", async () => {
        expect.assertions(3)

        try {
            await productBusiness.getProductsByUserId("invalidToken")
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })

    test("Should receive a valid token and return a custom error about no products registered yet", async () => {
        expect.assertions(3)

        try {
            await productBusiness.getProductsByUserId("token")
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The user has not registered any products yet.")
        }
    })
})

describe("Testing the createProduct endpoint", () => {
    test("Should not receive the image url and return a custom error", async () => {
        expect.assertions(3)

        const input: inputCreateProductDTO = {
            name: "notebook",
            price: 520,
            imageUrl: "",
            token: "token"
        }

        try {
            await productBusiness.createProduct(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the image url.")
        }
    })

    test("Should receive a negative number as a price and return a custom error", async () => {
        expect.assertions(3)

        const input: inputCreateProductDTO = {
            name: "notebook",
            price: -520,
            imageUrl: "http://www.image.com.br",
            token: "token"
        }

        try {
            await productBusiness.createProduct(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The price cannot be less than or equal to zero.")
        }
    })

    test("Should receive a valid input", async () => {
        const input: inputCreateProductDTO = {
            name: "notebook",
            price: 520,
            imageUrl: "http://www.image.com.br",
            token: "token"
        }

        const result = await productBusiness.createProduct(input)
        expect(result).not.toBeDefined()
    })
})

describe("Testing the editProductInfo endpoint", () => {
    test("Should receive an invalid product id and return a custom error", async () => {
        expect.assertions(3)

        const input: inputEditProductInfoDTO = {
            id: 20,
            name: "Playstation",
            price: 2500,
            imageUrl: "http://www.image.com.br",
            token: "token"
        }

        try {
            await productBusiness.editProductInfo(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Product not found.")
        }
    })

    test("Should not receive the token and return a custom error", async () => {
        expect.assertions(3)

        const input: inputEditProductInfoDTO = {
            id: 1,
            name: "Playstation",
            price: 2500,
            imageUrl: "http://www.image.com.br",
            token: ""
        }

        try {
            await productBusiness.editProductInfo(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the token.")
        }
    })

    test("Should receive an invalid token and return a custom error", async () => {
        expect.assertions(3)

        const input: inputEditProductInfoDTO = {
            id: 1,
            name: "Playstation",
            price: 2500,
            imageUrl: "http://www.image.com.br",
            token: "invalidToken"
        }

        try {
            await productBusiness.editProductInfo(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })

    test("Should receive a valid input from a user who wants to edit a product that it was not registered by them", async () => {
        expect.assertions(3)

        const input: inputEditProductInfoDTO = {
            id: 1,
            name: "McBook Pro 2",
            price: 6600,
            imageUrl: "",
            token: "token"
        }

        try {
            await productBusiness.editProductInfo(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })
})

describe("Testing the getAllProducts endpoint", () => {
    test("Should receive a valid input with an invalid search term and return a custom error", async () => {
        expect.assertions(3)
        
        const input: inputGetAllProductsDTO = {
            order: productOrder.ASC,
            search: "No product",
            size: 5,
            page: 1
        }

        try {
            await productBusiness.getAllProducts(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("No products found with the given search parameters.")
        }
    })
    
    test("Should receive a valid input with a searched term specified and return the product", async () => {
        const input: inputGetAllProductsDTO = {
            order: productOrder.ASC,
            search: "McBook Pro",
            size: 5,
            page: 1
        }

        const result = await productBusiness.getAllProducts(input)
        expect(result).toEqual([{
            id: 1,
            name: "McBook Pro",
            price: 6250.8,
            image_url: "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU",
            fk_user_id: "1fg65-f3s45-s5s4s-jhasd2-hjba-85gh3a"
        }])
    })
})