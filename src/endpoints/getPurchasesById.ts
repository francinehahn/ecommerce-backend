import { Request, Response } from "express"
import PurchaseDatabase from "../class/PurchaseDatabase"
import UserDatabase from "../class/UserDatabase"


export const getPurchasesById = async (req: Request, res: Response) => {
    let errorCode = 400

    try {
        const user_id = req.params.user_id

        if (user_id === ':user_id') {
            errorCode = 422
            throw new Error("Provide user id.")
        }

        const user = new UserDatabase()
        const userExists = await user.getById(user_id)

        if (userExists.length === 0) {
            errorCode = 404
            throw new Error("User does not exist.")
        }

        const purchases = new PurchaseDatabase()
        const result = await purchases.selectPurchases(user_id)
        
        if (result.length === 0) {
            errorCode = 200
            throw new Error("User has not made any purchases yet.")
        }

        res.status(200).send(result)

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}