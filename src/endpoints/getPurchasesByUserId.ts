import { Request, Response } from "express"
import PurchaseDatabase from "../class/PurchaseDatabase"
import UserDatabase from "../class/UserDatabase"


export const getPurchasesByUserId = async (req: Request, res: Response) => {
    let errorCode = 400

    try {
        const id = req.params.id
        const token = req.headers.token as string

        if (id === ':id') {
            errorCode = 422
            throw new Error("Provide user id.")
        }

        const user = new UserDatabase()
        const userExists = await user.getById(id)

        if (userExists.length === 0) {
            errorCode = 404
            throw new Error("User does not exist.")
        }

        if (!token) {
            errorCode = 422
            throw new Error("Provide the token.")
        }

        if (userExists[0].token !== token) {
            errorCode = 401
            throw new Error("The token does not exist.")
        }

        const purchases = new PurchaseDatabase()
        const result = await purchases.selectPurchases("user_id", id)
        
        if (result.length === 0) {
            errorCode = 200
            throw new Error("User has not made any purchases yet.")
        }

        res.status(200).send(result)

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}