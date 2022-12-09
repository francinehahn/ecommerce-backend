import Database from "./Database"


export default class UserDatabase extends Database {
    //Method that inserts a new user into the database
    public async insertUser(id: string, name: string, email: string, password: string) {
        await Database.connection.raw(`
            INSERT INTO Labecommerce_users VALUES('${id}', '${name}', '${email}', '${password}');
        `)
    }

    //Method that updates user information
    public async updateInfo (id: string, email: string, password: string) {
        await Database.connection.raw(`
            UPDATE Labecommerce_users SET email = '${email}', password = '${password}'
            WHERE id = '${id}';
        `)
    }

    //Method that receives an id and returns the corresponding user
    public async getUserById(id: string) {
        const result = await Database.connection.raw(`
            SELECT * FROM Labecommerce_users WHERE id = '${id}';
        `)
        return result[0]
    }

    //Method that receives an email and returns the corresponding user
    public async getUserByEmail(email: string) {
        const result = await Database.connection.raw(`
            SELECT * FROM Labecommerce_users WHERE email = '${email}';
        `)
        return result[0]
    }

    //Method that returns all users
    public async selectAllUsers () {
        let usersNewArray = []
        
        const users = await Database.connection.raw(`
            SELECT * FROM Labecommerce_users;
        `)

        for (let i = 0; i < users[0].length; i++) {
            const purchases = await Database.connection.raw(`
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