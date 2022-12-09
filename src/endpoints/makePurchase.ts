import { Request, Response } from "express"
import ProductDatabase from "../class/ProductDatabase"
import Purchase from "../class/Purchase"
import PurchaseDatabase from "../class/PurchaseDatabase"
import UserDatabase from "../class/UserDatabase"


export const makePurchase = async (req: Request, res: Response) => {
    let errorCode = 400

    try {
        const {user_id, product_id, quantity} = req.body

        if (!user_id && !product_id && !quantity) {
            errorCode = 422
            throw new Error("Provide the user id, the product id and the quantity.")
        } else if (!user_id) {
            errorCode = 422
            throw new Error("Provide the user id.")
        } else if (!product_id) {
            errorCode = 422
            throw new Error("Provide the product id.")
        } else if (!quantity) {
            errorCode = 422
            throw new Error("Provide the quantity.")
        } else if (Number(quantity) <= 0) {
            errorCode = 422
            throw new Error("Provide a quantity that is higher than zero.")
        }

        const user = new UserDatabase()
        const userExists = await user.getUserById(user_id)

        if (userExists.length === 0) {
            errorCode = 422
            throw new Error("User id does not exist.")
        }

        const product = new ProductDatabase()
        const productExists = await product.getProductById(product_id)

        if (productExists.length === 0) {
            errorCode = 422
            throw new Error("Product id does not exist.")
        }

        const id = Date.now().toString()
        const totalPrice = Number(quantity) * Number(productExists[0].price)

        const newPurchase = new Purchase(id, user_id, product_id, quantity, Number(totalPrice.toFixed(2)))
        const insertPurchase = new PurchaseDatabase()
        
        await insertPurchase.insertPurchase(newPurchase.getId(), newPurchase.getUserId(), newPurchase.getProductId(), newPurchase.getQuantity(), newPurchase.getTotalPrice())
        
        res.status(201).send('Success! Purchase has been registered!')

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }

}