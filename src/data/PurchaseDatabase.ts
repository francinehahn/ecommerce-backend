import BaseDatabase from "./BaseDatabase"
import Purchase from "../models/Purchase"
import { CustomError } from "../errors/CustomError"


export default class PurchaseDatabase extends BaseDatabase {
    TABLE_NAME = "Labecommerce_purchases"
    
    getPurchasesByUserId = async (id: string): Promise<Purchase[]> => {
        try {    
            return BaseDatabase.connection(this.TABLE_NAME).select().where("fk_user_id", id)
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    createPurchase = async (newPurchase: Purchase): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).insert(newPurchase)
             
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getSalesByProductId = async (id: number): Promise<any> => {
        try {
            return await BaseDatabase.connection(this.TABLE_NAME).select().where("fk_product_id", id)
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}