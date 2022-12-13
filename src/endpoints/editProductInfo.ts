import { Request, Response } from "express"
import ProductDatabase from "../class/ProductDatabase"


export const editProductInfo = async (req: Request, res: Response) => {
    let errorCode = 400

    try {
        const id = req.params.id
        let {name, price, image_url} = req.body

        if (id === ':id') {
            errorCode = 422
            throw new Error("Provide product id.")
        }

        const product = new ProductDatabase()
        const productExists = await product.getById(id)

        if (productExists.length === 0) {
            errorCode = 404
            throw new Error("Product not found.")
        }
        
        if (!name) {
            name = productExists[0].name
        }
        
        if (!price) {
            price = productExists[0].price
        }

        if (!image_url) {
            image_url = productExists[0].image_url
        }

        await product.updateInfo(id, name, price, image_url)
        
        res.status(201).send('Success! Product information has been edited!')

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}