import { Request, Response } from "express"
import ProductDatabase from "../class/ProductDatabase"
import Purchase from "../class/Purchase"
import PurchaseDatabase from "../class/PurchaseDatabase"
import UserDatabase from "../class/UserDatabase"


export const makePurchase = async (req: Request, res: Response) => {
    let errorCode = 400

    try {
        const products = req.body
        const token = req.headers.token as string

        if (!token) {
            errorCode = 422
            throw new Error("Provide the token.")            
        }

        if (!products) {
            errorCode = 422
            throw new Error("Provide the user_id, the product_id and the quantity of each product.")
        }

        const user = new UserDatabase()
        const userExists = await user.getById(products[0].user_id)

        if (userExists.length === 0) {
            errorCode = 422
            throw new Error("User id does not exist.")
        }

        const userInfo = await user.getUserByToken(token)
        
        if (userInfo.length === 0) {
            errorCode = 401
            throw new Error("Incorrect token.")
        }

        const product = new ProductDatabase()
        for (let i = 0; i < products.length; i++) {
            const productExists = await product.getById(products[i].product_id)

            if (productExists.length === 0) {
                errorCode = 422
                throw new Error("Product id does not exist.")
            }

            const id = Date.now().toString()
            const totalPrice = Number(products[i].quantity) * Number(productExists[0].price)

            const today = new Date(Date.now()).toISOString().toString().slice(0, 10)
            
            const newPurchase = new Purchase(id, products[i].user_id, products[i].product_id, products[i].quantity, Number(totalPrice.toFixed(2)), new Date(today))
            const insertPurchase = new PurchaseDatabase()
            
            await insertPurchase.insertPurchase(newPurchase)
        }
         
        res.status(201).send('Success! Purchase has been registered!')

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }

}