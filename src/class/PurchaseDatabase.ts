import BaseDatabase from "./BaseDatabase"
import Purchase from "./Purchase"

export default class PurchaseDatabase extends BaseDatabase {
    TABLE_NAME = "Labecommerce_purchases"
    
    //Method that returns all purchases from a user
    public async selectPurchases (user_id: string) {
        const result = await BaseDatabase.connection.raw(`
            SELECT * FROM Labecommerce_purchases WHERE user_id = '${user_id}';
        `)

        return result[0]
    }

    //Method that inserts values into the database
    public async insertPurchase (purchase: Purchase) {
        super.create(purchase)
    }
}