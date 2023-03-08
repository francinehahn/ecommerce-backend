import { UserRepository } from "../../src/business/UserRepository"
import { Unauthorized } from "../../src/errors/UserErrors"
import User, { updatePasswordDTO, updateUserInfoDTO } from "../../src/models/User"
import { UsersMock } from "./UsersMock"


export default class UserDatabaseMock implements UserRepository {

    signup = async (newUser: User): Promise<void> => {}

    editUserInfo = async (userInfo: updateUserInfoDTO): Promise<void> => {}

    getUserBy = async (column: string, value: string): Promise<any> => {
        const filter = UsersMock.filter(item => item.email === value || item.id === value)
        return filter[0]
    }

    recoverPassword = async (updatePassword: updatePasswordDTO): Promise<void> => {}
}