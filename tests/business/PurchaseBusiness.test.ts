import { PurchaseBusiness } from "../../src/business/PurchaseBusiness"
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
    
})

describe("Testing the createPurchase endpoint", () => {
    
})

describe("Testing the getSalesByUserId endpoint", () => {
    
})