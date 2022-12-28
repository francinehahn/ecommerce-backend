import { Request, Response } from "express"
import UserDatabase from "../class/UserDatabase"


export const editUserInfo = async (req: Request, res: Response) => {
    let errorCode = 400

    try {
        const id = req.params.id
        let {email, password} = req.body
        const token = req.headers.token
        
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

        if (!email) {
            email = userExists[0].email
        }
        
        if (!password) {
            password = userExists[0].password
        }

        if (token !== userExists[0].token) {
            errorCode = 401
            throw new Error("Invalid token.")
        }

        await user.updateInfo(id, "email", email)
        await user.updateInfo(id, "password", password)
        
        res.status(201).send('Success! User information has been edited!')

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}