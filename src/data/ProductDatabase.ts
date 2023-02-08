import BaseDatabase from "./BaseDatabase"
import Product, { getProductsDTO, inputEditProductInfoDTO } from "../models/Product"


export default class ProductDatabase extends BaseDatabase {
    TABLE_NAME = "Labecommerce_products"
    
    getProductsByUserId = async (id: string) => {
        try {
            return await BaseDatabase.connection(this.TABLE_NAME).select().where("fk_userId", id)
    
        } catch (err: any) {
            throw new Error(err.message)
        }
    }


    createProduct = async (newProduct: Product) => {
        try {    
            await BaseDatabase.connection(this.TABLE_NAME).insert(newProduct)
    
        } catch (err: any) {
            throw new Error(err.message)
        }
    }


    editProductInfo = async (input: inputEditProductInfoDTO) => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
            .update({name: input.name, price: input.price, image_url: input.imageUrl})
            .where("id", input.id)
    
        } catch (err: any) {
            throw new Error(err.message)
        }
    }


    getllProducts = async (getProducts: getProductsDTO) => {
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


    getProductById = async (id: string) => {
        try {    
            const result = await BaseDatabase.connection(this.TABLE_NAME).select().where({id})
            return result[0]

        } catch (err: any) {
            throw new Error(err.message)
        }
    }
}