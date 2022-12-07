import { Request, Response } from "express"
import { connection } from "../database/connection"
import UserDatabase from "../class/UserDatabase"
import { getUserByEmail } from "../functions/getUserByEmail"
import User from "../class/User"

export const createAccount = async (req: Request, res: Response) => {
    const {name, email, password} = req.body
    let errorCode = 400

    try {
        if (!name && !email && !password) {
            errorCode = 422
            throw new Error("Provide user name, email and password.")
        } else if (!name) {
            errorCode = 422
            throw new Error("Provide user name.")
        } else if (!email) {
            errorCode = 422
            throw new Error("Provide the email.")
        } else if (!password) {
            errorCode = 422
            throw new Error("Provide the password.")
        }

        const userExists = await getUserByEmail(email)
        
        if (userExists.length > 0) {
            errorCode = 422
            throw new Error("User already registered.")
        }

        const id = Date.now().toString()
        const newUser = new User(id, name, email, password)
        const userDB = new UserDatabase(connection)
        userDB.insertUser(newUser)
        
        res.status(201).send('Success! User has been registered!')

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}