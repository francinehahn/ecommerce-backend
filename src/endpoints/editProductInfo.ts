import { Request, Response } from "express"
import ProductDatabase from "../class/ProductDatabase"
import UserDatabase from "../class/UserDatabase"


export const editProductInfo = async (req: Request, res: Response) => {
    let errorCode = 400

    try {
        const id = req.params.id
        let {name, price, image_url} = req.body
        const token = req.headers.token as string

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
        
        if (!token) {
            errorCode = 422
            throw new Error("Provide the token.")
        }

        const user = new UserDatabase()
        const userInfo = await user.getUserByToken(token)
        
        if (productExists[0].fk_userId !== userInfo[0].id) {
            errorCode = 401
            throw new Error("This user is not allowed to edit this product.")
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

        if (userInfo[0].token !== token) {
            errorCode = 401
            throw new Error("Invalid token.")
        }

        await product.updateInfo(id, "name", name)
        await product.updateInfo(id, "price", price)
        await product.updateInfo(id, "image_url", image_url)
        
        res.status(201).send('Success! Product information has been edited!')

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}