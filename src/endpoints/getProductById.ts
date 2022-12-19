import { Request, Response } from "express";
import ProductDatabase from "../class/ProductDatabase";


export async function getProductById (req: Request, res: Response) {
    let errorCode = 400
    
    try {
        const id = req.params.id

        if (id === ":id") {
            errorCode = 422
            throw new Error("Provide the product id.")   
        }

        const product = new ProductDatabase()
        const idExists = await product.getById(id)

        if (idExists.length === 0) {
            errorCode = 404
            throw new Error("Product not found.")
        }

        res.status(200).send(idExists[0])

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
} 