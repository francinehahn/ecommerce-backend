import Database from "./Database"


export default class UserDatabase extends Database {
    public async insertUser(id: string, name: string, email: string, password: string) {
        await Database.connection.raw(`
            INSERT INTO Labecommerce_users VALUES('${id}', '${name}', '${email}', '${password}');
        `)
    }

    public async updateInfo (id: string, email: string, password: string) {
        await Database.connection.raw(`
            UPDATE Labecommerce_users SET email = '${email}', password = '${password}'
            WHERE id = '${id}';
        `)
    }

    public async getUsers() {
        const result = await Database.connection.raw(`
            SELECT * FROM Labecommerce_users;
        `)
        return result[0]
    }

    public async getUserById(id: string) {
        const result = await Database.connection.raw(`
            SELECT * FROM Labecommerce_users WHERE id = '${id}';
        `)
        return result[0]
    }

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