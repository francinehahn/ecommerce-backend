import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import User, { inputEditUserInfoDTO, inputLoginDTO, inputSignupDTO } from "../models/User"


export class UserController {

    signup = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputSignupDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const userBusiness = new UserBusiness()
            const token = await userBusiness.signup(input)

            res.status(201).send({message: 'Success! User has been registered!', token})

        } catch (err: any) {
            res.status(400).send(err.message)
        }
    }


    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputLoginDTO = {
                email: req.body.email,
                password: req.body.password
            }
      
            const userBusiness = new UserBusiness()
            const token = await userBusiness.login(input)
    
            res.status(201).send({token})
    
        } catch (err: any) {
            res.status(400).send(err.message)
        }
    }


    editUserInfo = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputEditUserInfoDTO = {
                email: req.body.email,
                password: req.body.password,
                token: req.headers.authorization as string
            }
    
            const userBusiness = new UserBusiness()
            await userBusiness.editUserInfo(input)
            
            res.status(201).send('Success! User information has been edited!')
    
        } catch (err: any) {
            res.status(400).send(err.message)
        }
    }
}