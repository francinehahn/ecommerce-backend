import User, { updatePasswordDTO, updateUserInfoDTO } from "../models/User"

export interface UserRepository {
    signup (newUser: User): Promise<void>
    editUserInfo (userInfo: updateUserInfoDTO): Promise<void>
    getUserBy (column: string, value: string): Promise<any>
    recoverPassword (updatePassword: updatePasswordDTO): Promise<void>
}