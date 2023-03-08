import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { inputEditUserInfoDTO, inputLoginDTO, inputSignupDTO } from "../models/User"


export class UserController {
    constructor (private userBusiness: UserBusiness) {}

    signup = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputSignupDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const token = await this.userBusiness.signup(input)
            res.status(201).send({message: 'Success! User has been registered!', token})

        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputLoginDTO = {
                email: req.body.email,
                password: req.body.password
            }
      
            const token = await this.userBusiness.login(input)
            res.status(201).send({token})
    
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    getUserInfo = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string
            const result = await this.userBusiness.getUserInfo(token)
            res.status(200).send(result)
    
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    editUserInfo = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputEditUserInfoDTO = {
                name: req.body.name,
                email: req.body.email,
                token: req.headers.authorization as string
            }
    
            await this.userBusiness.editUserInfo(input)
            res.status(201).send('Success! User information has been edited!')
    
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    recoverPassword = async (req: Request, res: Response): Promise<void> => {
        try {
            const email = req.body.email

            await this.userBusiness.recoverPassword(email)
            res.status(201).send("Success! An e-mail has been sent to the user.")
            
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}