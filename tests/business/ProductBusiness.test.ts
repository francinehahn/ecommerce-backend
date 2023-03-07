import { ProductBusiness } from "../../src/business/ProductBusiness"
import { AuthenticatorMock } from "../mocks/AuthenticatorMock"
import ProductDatabaseMock from "../mocks/ProductDatabaseMock"


const productBusiness = new ProductBusiness(new ProductDatabaseMock(), new AuthenticatorMock())

/*describe("Testing the getProductsByUserId endpoint", () => {

})

describe("Testing the createProduct endpoint", () => {
    
})

describe("Testing the editProductInfo endpoint", () => {
    
})

describe("Testing the getAllProducts endpoint", () => {
    
})

describe("Testing the getProductById endpoint", () => {
    
})*/