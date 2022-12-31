import { Request, Response } from "express";
import UserDatabase from "../class/UserDatabase";


export async function getUserById (req: Request, res: Response) {
    let errorCode = 400

    try {
        const id = req.params.id

        if (id === ":id") {
            errorCode = 422
            throw new Error("Provide the user id.")
        }

        const user = new UserDatabase()
        const idExists = await user.getById(id)
        
        if (idExists.length === 0) {
            errorCode = 404
            throw new Error("User id not found.")
        }

        res.status(200).send(idExists[0])

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}