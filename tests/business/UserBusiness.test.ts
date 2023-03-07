import { UserBusiness } from "../../src/business/UserBusiness"
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

describe("Testing User Business", () => {
    
})