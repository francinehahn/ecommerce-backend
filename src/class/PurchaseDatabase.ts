import Database from "./Database"

export default class PurchaseDatabase extends Database {
    //Method that returns all purchases from a user
    public async selectPurchases (user_id: string) {
        const result = await Database.connection.raw(`
            SELECT * FROM Labecommerce_purchases WHERE user_id = '${user_id}';
        `)

        return result[0]
    }

    //Method to insert values into the table
    public async insertPurchase (id: string, user_id: string, product_id: string, quantity: number, price: number) {
        await Database.connection.raw(`
            INSERT INTO Labecommerce_purchases
            VALUES('${id}', '${user_id}', '${product_id}', ${quantity}, ${price});
        `)
    }
}