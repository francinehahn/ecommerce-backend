import BaseDatabase from "./BaseDatabase"
import Purchase from "./Purchase"

export default class PurchaseDatabase extends BaseDatabase {
    TABLE_NAME = "Labecommerce_purchases"
    
    //Method that returns purchases 
    public async selectPurchases (column: string, id: string) {
        const result = await BaseDatabase.connection.raw(`
            SELECT * FROM ${this.TABLE_NAME} WHERE ${column} = '${id}';
        `)

        return result[0]
    }

    //Method that inserts values into the database
    public async insertPurchase (purchase: Purchase) {
        super.create(purchase)
    }
}