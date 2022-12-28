import { Request, Response } from "express"
import Product from "../class/Product"
import ProductDatabase from "../class/ProductDatabase"
import UserDatabase from "../class/UserDatabase"

export const registerProduct = async (req: Request, res: Response) => {
    let errorCode = 400

    try {
        const id = req.params.id
        const {name, price, image_url} = req.body
        const token = req.headers.token as string

        if (id === ":id") {
            errorCode = 422
            throw new Error("Provide the user id.")
        } else if (!token) {
            errorCode = 422
            throw new Error("Provide the token.")
        } else if (!name && !price && !image_url) {
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

        const user = new UserDatabase()
        const userInfo = await user.getUserByToken(token)

        if (userInfo[0].token !== token) {
            errorCode = 401
            throw new Error("Incorrect token.")
        }

        const newProduct = new Product(Date.now().toString(), name, price, image_url, id)
        const insertProduct = new ProductDatabase()
        await insertProduct.createProduct(newProduct)
        
        res.status(201).send('Success! The product has been registerd!')

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}