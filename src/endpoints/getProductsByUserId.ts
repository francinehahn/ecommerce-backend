import { Request, Response } from "express"
import ProductDatabase from "../class/ProductDatabase"
import UserDatabase from "../class/UserDatabase"


export async function getProductsByUserId (req: Request, res: Response) {
    let errorCode = 400
    
    try {
        const id = req.params.id
        const token = req.headers.token as string

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
        const productsByUserId = await products.selectAllProducts(id, "=", "fk_userId", "asc", -1, 2)
        
        if (productsByUserId.length === 0) {
            errorCode = 200
            throw new Error("The user has not registered any products yet.")
        }

        res.status(200).send(productsByUserId)

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
} 