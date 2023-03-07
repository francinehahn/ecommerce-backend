import { ProductBusiness } from "../../src/business/ProductBusiness"
import { AuthenticatorMock } from "../mocks/AuthenticatorMock"
import ProductDatabaseMock from "../mocks/ProductDatabaseMock"


const productBusiness = new ProductBusiness(new ProductDatabaseMock(), new AuthenticatorMock())

describe("Testing Product Business", () => {
    
})