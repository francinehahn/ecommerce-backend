import { Request, Response } from "express"
import ProductDatabase from "../class/ProductDatabase"
import PurchaseDatabase from "../class/PurchaseDatabase"
import UserDatabase from "../class/UserDatabase"


export async function getSalesByUserId (req: Request, res: Response) {
    let errorCode = 400

    try {
        const id = req.params.id
        const token = req.headers.token

        if (id === ":id") {
            errorCode = 422
            throw new Error("Provide the user id.")   
        }

        const user = new UserDatabase()
        const idExists = await user.getById(id)
        
        if (idExists.length === 0) {
            errorCode = 404
            throw new Error("User not found.")
        }

        if (!token) {
            errorCode = 422
            throw new Error("Provide the token.")
        }

        if (idExists[0].token !== token) {
            errorCode = 401
            throw new Error("The token does not exist.")
        }

        const products = new ProductDatabase()
        const getAllProducts = await products.selectAllProducts()
        
        const purchases = new PurchaseDatabase()
        const productsRegisteredByUser = getAllProducts.filter((item: any) => item.fk_userId === id)

        let arrayOfSales = []
        for (let i = 0; i < productsRegisteredByUser.length; i++) {
            let sales = await purchases.selectPurchases("product_id", productsRegisteredByUser[i].id)
            arrayOfSales.push(...sales)
        }
        
        res.status(200).send(arrayOfSales)

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}