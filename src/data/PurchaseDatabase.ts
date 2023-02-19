import BaseDatabase from "./BaseDatabase"
import Purchase from "../models/Purchase"
import { CustomError } from "../errors/CustomError"
import { PurchaseRepository } from "../business/PurchaseRepository"


export default class PurchaseDatabase extends BaseDatabase implements PurchaseRepository {
    TABLE_NAME = "Labecommerce_purchases"
    
    getPurchasesByUserId = async (id: string): Promise<Purchase[]> => {
        try {    
            return BaseDatabase.connection(this.TABLE_NAME).select().where("fk_user_id", id).orderBy("created_at", "desc")
    
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
            return await BaseDatabase.connection(this.TABLE_NAME).select().where("fk_product_id", id).orderBy("created_at", "desc")
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}