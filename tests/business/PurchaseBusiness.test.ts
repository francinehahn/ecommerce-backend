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

describe("Testing Purchase Business", () => {
    
})