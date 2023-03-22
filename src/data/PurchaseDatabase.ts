import BaseDatabase from "./BaseDatabase"
import Purchase, { outputGetPurchasesByUserId } from "../models/Purchase"
import { CustomError } from "../errors/CustomError"
import { PurchaseRepository } from "../business/PurchaseRepository"


export default class PurchaseDatabase extends BaseDatabase implements PurchaseRepository {
    TABLE_NAME = "Labecommerce_purchases"

    getPurchasesByUserId = async (id: string): Promise<outputGetPurchasesByUserId[] | []> => {
        try {    
            return BaseDatabase.connection(this.TABLE_NAME)
            .join("Labecommerce_products", "Labecommerce_purchases.fk_product_id", "=", "Labecommerce_products.id")
            .select("Labecommerce_purchases.id", "Labecommerce_purchases.fk_user_id", "Labecommerce_products.name" as "product_name", "Labecommerce_purchases.quantity", "Labecommerce_purchases.total_price", "Labecommerce_purchases.created_at")
            .where("Labecommerce_purchases.fk_user_id", id)
            .orderBy("created_at", "desc")
    
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