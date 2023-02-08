import BaseDatabase from "./BaseDatabase"
import User, { updateUserInfoDTO } from "../models/User"
import { CustomError } from "../errors/CustomError"


export default class UserDatabase extends BaseDatabase {
    TABLE_NAME = "Labecommerce_users"

    signup = async (newUser: User): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).insert(newUser)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    editUserInfo = async (userInfo: updateUserInfoDTO): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
            .update({email: userInfo.email, password: userInfo.password})
            .where("id", userInfo.id)
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getUserBy = async (column: string, value: string): Promise<any> => {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME).select().where(column, value)
            return result[0]

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}