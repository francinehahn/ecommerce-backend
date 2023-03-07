import { UserRepository } from "../../src/business/UserRepository"
import User, { updateUserInfoDTO } from "../../src/models/User"


export default class UserDatabaseMock implements UserRepository {

    signup = async (newUser: User): Promise<void> => {
        return
    }

    editUserInfo = async (userInfo: updateUserInfoDTO): Promise<void> => {
        
    }

    getUserBy = async (column: string, value: string): Promise<any> => {
        
    }
}