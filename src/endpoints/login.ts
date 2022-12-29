import { Request, Response } from "express"
import UserDatabase from "../class/UserDatabase"

export async function login (req: Request, res: Response) {
    let errorCode = 400
    
    try {
        const {email, password} = req.body

        if (!email) {
            errorCode = 422
            throw new Error ("Provide the user email.")
        }

        if (!password) {
            errorCode = 422
            throw new Error ("Provide the user password.")
        }

        const user = new UserDatabase()
        const emailExists = await user.getUserByEmail(email)
        
        if (emailExists.length === 0) {
            errorCode = 422
            throw new Error("Email not found.")
        }
    
        if (password !== emailExists[0].password) {
            errorCode = 422
            throw new Error("Incorrect password.")
        }

        const token = () => {
            return Math.random().toString(36).slice(-10)
        }
        
        const id = emailExists[0].id
        await user.updateInfo(id, "token", token())

        res.status(200).send(token())

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}