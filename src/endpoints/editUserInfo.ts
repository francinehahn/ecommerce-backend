import { Request, Response } from "express"
import UserDatabase from "../class/UserDatabase"


export const editUserInfo = async (req: Request, res: Response) => {
    let errorCode = 400

    try {
        const id = req.params.id
        let {email, password} = req.body
        
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
        
        if (!email) {
            email = userExists[0].email
        }
        
        if (!password) {
            password = userExists[0].password
        }
        
        await user.updateInfo(id, email, password)
        
        res.status(201).send('Success! User information has been edited!')

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}