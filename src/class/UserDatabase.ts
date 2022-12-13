import BaseDatabase from "./BaseDatabase"
import User from "./User"


export default class UserDatabase extends BaseDatabase {
    TABLE_NAME = "Labecommerce_users"
    
    //Method that inserts a new user into the database
    public async insertUser(user: User) {
        super.create(user)
    }

    //Method that updates user information
    public async updateInfo (id: string, email: string, password: string) {
        await BaseDatabase.connection.raw(`
            UPDATE Labecommerce_users SET email = '${email}', password = '${password}'
            WHERE id = '${id}';
        `)
    }

    //Method that receives an id and returns the corresponding user
    public async getById(id: string) {
        return super.getById(id)
    }

    //Method that receives an email and returns the corresponding user
    public async getUserByEmail(email: string) {
        const result = await BaseDatabase.connection.raw(`
            SELECT * FROM Labecommerce_users WHERE email = '${email}';
        `)
        return result[0]
    }

    //Method that returns all users
    public async selectAllUsers () {
        let usersNewArray = []
        
        const users = await BaseDatabase.connection.raw(`
            SELECT * FROM Labecommerce_users;
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