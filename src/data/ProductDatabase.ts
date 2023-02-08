import BaseDatabase from "./BaseDatabase"
import Product, { getProductsDTO, inputEditProductInfoDTO, returnProductsDTO } from "../models/Product"


export default class ProductDatabase extends BaseDatabase {
    TABLE_NAME = "Labecommerce_products"
    
    getProductsByUserId = async (id: string): Promise<returnProductsDTO[]> => {
        try {
            return await BaseDatabase.connection(this.TABLE_NAME).select().where("fk_user_id", id)
    
        } catch (err: any) {
            throw new Error(err.message)
        }
    }


    createProduct = async (newProduct: Product): Promise<void> => {
        try {    
            await BaseDatabase.connection(this.TABLE_NAME).insert(newProduct)
    
        } catch (err: any) {
            throw new Error(err.message)
        }
    }


    editProductInfo = async (input: inputEditProductInfoDTO): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
            .update({name: input.name, price: input.price, image_url: input.imageUrl})
            .where("id", input.id)
    
        } catch (err: any) {
            throw new Error(err.message)
        }
    }


    getllProducts = async (getProducts: getProductsDTO): Promise<returnProductsDTO[]> => {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME)
            .select()
            .where("name", "like", getProducts.search)
            .orderBy("name", getProducts.order)
            .limit(getProducts.size)
            .offset(getProducts.offset)
            
            return result

        } catch (err: any) {
            throw new Error(err.message)
        }
    }


    getProductById = async (id: number): Promise<any> => {
        try {    
            const result = await BaseDatabase.connection(this.TABLE_NAME).select().where({id})
            return result[0]

        } catch (err: any) {
            throw new Error(err.message)
        }
    }
}