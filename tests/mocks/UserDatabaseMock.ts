import { UserRepository } from "../../src/business/UserRepository"
import User, { updateUserInfoDTO } from "../../src/models/User"
import { UsersMock } from "./UsersMock"


export default class UserDatabaseMock implements UserRepository {

    signup = async (newUser: User): Promise<void> => {}

    editUserInfo = async (userInfo: updateUserInfoDTO): Promise<void> => {}

    getUserBy = async (column: string, value: string): Promise<any> => {
        const filter = UsersMock.filter(item => item.email === value || item.id === value)
        return filter
    }
}