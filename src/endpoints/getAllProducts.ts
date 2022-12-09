import { Request, Response } from "express"
import ProductDatabase from "../class/ProductDatabase"


export const getAllProducts = async (req: Request, res: Response) => {
    let errorCode = 400
    
    try {
        const {order, search} = req.query
        const products = new ProductDatabase()
        
        if (order) {
            if (order !== 'asc' && order !== 'desc') {
                errorCode = 422
                throw new Error("The order must be asc or desc.")
            } else if (!search) {
                const result = await products.selectAllProductsOrderedBy(order)
                res.status(200).send(result)
            } else if (search) {
                const result = await products.searchProductsAndOrder(search.toString(), order)
                if (result.length === 0) {
                    errorCode = 422
                    throw new Error("Product not found.")
                } else {
                    res.status(200).send(result)
                }
            }

        } else {
            if (!search) {
                const result = await products.selectAllProducts()
                res.status(200).send(result)
            } else if (search) {
                const result = await products.searchProducts(search.toString())
                if (result.length === 0) {
                    errorCode = 422
                    throw new Error("Product not found.")
                } else {
                    res.status(200).send(result)
                }
            }
        }

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}