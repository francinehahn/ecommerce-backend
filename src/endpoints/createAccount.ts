import { Request, Response } from "express"
import UserDatabase from "../class/UserDatabase"
import User from "../class/User"

export const createAccount = async (req: Request, res: Response) => {
    let errorCode = 400

    try {
        const {name, email, password} = req.body

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

        const user = new UserDatabase()
        const userExists = await user.getUserByEmail(email)
        
        if (userExists.length > 0) {
            errorCode = 422
            throw new Error("User already registered.")
        }

        const id = Date.now().toString()
        const newUser = new User(id, name, email, password)
        const insertUser = new UserDatabase()
        insertUser.insertUser(newUser.getId(), newUser.getName(), newUser.getEmail(), newUser.getPassword())
        
        res.status(201).send('Success! User has been registered!')

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}