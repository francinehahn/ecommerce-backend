import ProductDatabase from "../data/ProductDatabase"
import PurchaseDatabase from "../data/PurchaseDatabase"
import { CustomError } from "../errors/CustomError"
import { MissingInputProducts, NoProductsRegistered, ProductNotFound } from "../errors/ProductErrors"
import { NoSalesFound } from "../errors/PurchaseErrors"
import { MissingToken } from "../errors/UserErrors"
import Purchase, { inputCreatePurchaseDTO, returnSalesDTO } from "../models/Purchase"
import { Authenticator } from "../services/Authenticator"
import { generateId } from "../services/generateId"


export class PurchaseBusiness {

    getPurchasesByUserId = async (token: string): Promise<Purchase[]> => {
        try {    
            if (!token) {
                throw new MissingToken()
            }

            const authenticator = new Authenticator()
            const {id} = await authenticator.getTokenData(token)
    
            const purchaseDatabase = new PurchaseDatabase()
            const result = await purchaseDatabase.getPurchasesByUserId(id)
    
            if (result.length === 0) {
                throw new NoProductsRegistered()
            }

            return result

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getSalesByUserId = async (token: string): Promise<returnSalesDTO[]> => {
        try {
            if (!token) {
                throw new MissingToken()
            }

            const authenticator = new Authenticator()
            const {id} = await authenticator.getTokenData(token)
    
            const productDatabase = new ProductDatabase()
            const allUserProducts = await productDatabase.getProductsByUserId(id)
           
            const purchaseDatabase = new PurchaseDatabase()
    
            let arrayOfSales = []
            for (let i = 0; i < allUserProducts.length; i++) {
                const sales = await purchaseDatabase.getSalesByProductId(allUserProducts[i].id)
                arrayOfSales.push(...sales)
            }
            
            for (let i = 0; i < arrayOfSales.length; i++) {
                const productInfo: any = await productDatabase.getProductById(arrayOfSales[i].fk_product_id)
                console.log(productInfo)
                arrayOfSales[i] = {...arrayOfSales[i], product_name: productInfo.name}
            }

            if (arrayOfSales.length === 0) {
                throw new NoSalesFound()
            }

            return arrayOfSales
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    createPurchase = async (input: inputCreatePurchaseDTO): Promise<void> => {
        try {    
            if (!input.token) {
                throw new MissingToken()          
            }
            
            const authenticator = new Authenticator()
            const {id} = await authenticator.getTokenData(input.token)
    
            if (!input.products) {
                throw new MissingInputProducts()
            }
    
            const productDatabase = new ProductDatabase()
            
            for (let i = 0; i < input.products.length; i++) {
                const productExists = await productDatabase.getProductById(input.products[i].productId)
                
                if (!productExists) {
                    throw new ProductNotFound()
                }
    
                const purchaseId = generateId()
                const totalPrice = Number(input.products[i].quantity) * Number(productExists.price)
    
                let today = new Date()
                today = new Date(`${today.getFullYear()}, ${today.getMonth() + 1}, ${today.getDate()}`)

                const newPurchase = new Purchase(
                    purchaseId,
                    id,
                    input.products[i].productId,
                    input.products[i].quantity,
                    Number(totalPrice.toFixed(2)),
                    today
                )

                const purchaseDatabase = new PurchaseDatabase()
                await purchaseDatabase.createPurchase(newPurchase)
            }
             
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}