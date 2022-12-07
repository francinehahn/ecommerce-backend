/*import { Request, Response } from "express"
import { connection } from "../database/connection"
import { getProductById } from "../functions/getProductById"
import ProductDatabase from "../class/ProductDatabase"
import Product from "../class/Product"

export const editProductInfo = async (req: Request, res: Response) => {
    const id = req.params.id
    let {name, price, image_url} = req.body
    let errorCode = 400

    try {
        if (id === ':id') {
            errorCode = 422
            throw new Error("Provide product id.")
        }

        const productExists = await getProductById(id)

        if (productExists.length === 0) {
            errorCode = 404
            throw new Error("Product not found.")
        }
        
        if (!name) {
            const result = await getProductById(id)
            name = result[0].name
        }
        
        if (!price) {
            const result = await getProductById(id)
            price = result[0].price
        }

        if (!image_url) {
            const result = await getProductById(id)
            image_url = result[0].image_url
        }


        const newProductInfo: Product = {id, name, price, image_url}
        const editProductDB = new ProductDatabase(connection)
        editProductDB.updateInfo(newProductInfo)
        
        res.status(201).send('Success! Product information has been edited!')

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}*/