import BaseDatabase from "./BaseDatabase"
import User, { updateUserInfoDTO } from "../models/User"
import ProductDatabase from "./ProductDatabase"


export default class UserDatabase extends BaseDatabase {
    TABLE_NAME = "Labecommerce_users"

    signup = async (newUser: User) => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).insert(newUser)
        } catch (err: any) {
            throw new Error(err.message)
        }
    }


    editUserInfo = async (userInfo: updateUserInfoDTO) => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
            .update({email: userInfo.email, password: userInfo.password})
            .where("id", userInfo.id)
    
        } catch (err: any) {
            throw new Error(err.message)
        }
    }


    getUserBy = async (column: string, value: string) => {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME).select().where(column, value)
            return result[0]

        } catch (err: any) {
            throw new Error(err.message)
        }
    }


    //Method that receives a token and returns the corresponding user
    public async getUserByToken(token: string) {
        const result = await BaseDatabase.connection.raw(`
            SELECT * FROM ${this.TABLE_NAME} WHERE token = '${token}';
        `)
        return result[0]
    }

    //Method that returns all users
    public async selectAllUsers () {
        let usersNewArray = []
        
        const users = await BaseDatabase.connection.raw(`
            SELECT * FROM ${this.TABLE_NAME};
        `)

        for (let i = 0; i < users[0].length; i++) {
            const purchases = await BaseDatabase.connection.raw(`
                SELECT Labecommerce_products.name, Labecommerce_products.price, Labecommerce_products.image_url,
                Labecommerce_purchases.quantity, Labecommerce_purchases.total_price
                FROM Labecommerce_purchases JOIN Labecommerce_products ON Labecommerce_products.id = Labecommerce_purchases.product_id
                AND Labecommerce_purchases.user_id LIKE '${users[0][i].id}';
            `)
            
            usersNewArray.push({...users[0][i], purchases: purchases[0]})
        }
        
        return usersNewArray
    }
}