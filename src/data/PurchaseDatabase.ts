import BaseDatabase from "./BaseDatabase"
import Purchase from "../models/Purchase"


export default class PurchaseDatabase extends BaseDatabase {
    TABLE_NAME = "Labecommerce_purchases"
    
    getPurchasesByUserId = async (id: string) => {
        try {    
            return BaseDatabase.connection(this.TABLE_NAME).select().where("fk_user_id", id)
    
        } catch (err: any) {
            throw new Error(err.message)
        }
    }


    createPurchase = async (newPurchase: Purchase) => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).insert(newPurchase)
             
        } catch (err: any) {
            throw new Error(err.message)
        }
    }


    getSalesByProductId = async (id: string) => {
        try {
            return await BaseDatabase.connection(this.TABLE_NAME).select().where("fk_product_id", id)
    
        } catch (err: any) {
            throw new Error(err.message)
        }
    }
}