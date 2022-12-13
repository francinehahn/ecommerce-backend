import { Request, Response } from "express"
import Product from "../class/Product"
import ProductDatabase from "../class/ProductDatabase"

export const registerProduct = async (req: Request, res: Response) => {
    let errorCode = 400

    try {
        const {name, price, image_url} = req.body

        if (!name && !price && !image_url) {
            errorCode = 422
            throw new Error("Provide the product name, price and image url.")
        } else if (!name) {
            errorCode = 422
            throw new Error("Provide the product name.")
        } else if (!price) {
            errorCode = 422
            throw new Error("Provide the price.")
        } else if (!image_url) {
            errorCode = 422
            throw new Error("Provide the image url.")
        } else if (Number(price) <= 0) {
            errorCode = 422
            throw new Error("Provide a valid price.")
        }

        const newProduct = new Product(Date.now().toString(), name, price, image_url)
        const insertProduct = new ProductDatabase()
        await insertProduct.createProduct(newProduct)
        res.status(201).send('Success! The product has been registerd!')

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}