import { Request, Response } from "express"
import UserDatabase from "../class/UserDatabase"


export const getAllUsers = async (req: Request, res: Response) => {
    let errorCode = 400

    try {
        const users = new UserDatabase()
        const result = await users.selectAllUsers()
        res.status(200).send(result)

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}