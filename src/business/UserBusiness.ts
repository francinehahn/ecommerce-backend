import UserDatabase from "../data/UserDatabase"
import { CustomError } from "../errors/CustomError"
import { DuplicateEmail, EmailNotFound, IncorrectPassword, InvalidEmail, InvalidPassword, MissingEmail, MissingPassword, MissingToken, MissingUserName } from "../errors/UserErrors"
import User, { inputEditUserInfoDTO, inputLoginDTO, inputSignupDTO, updateUserInfoDTO } from "../models/User"
import { Authenticator } from "../services/Authenticator"
import { generateId } from "../services/generateId"
import { HashManager } from "../services/HashManager"


export class UserBusiness {

    signup = async (input: inputSignupDTO): Promise<string> => {
        try {
            if (!input.name) {
                throw new MissingUserName()
            }
            if (!input.email) {
                throw new MissingEmail()
            }
            if(!input.email.includes("@") || input.email.length < 12) {
                throw new InvalidEmail()
            }
            if (!input.password) {
                throw new MissingPassword()
            }
            if (input.password.length < 6) {
                throw new InvalidPassword()
            }
    
            const userDatabase = new UserDatabase()
            const userExists = await userDatabase.getUserBy("email", input.email)
            
            if (userExists) {
                throw new DuplicateEmail()
            }
    
            const hashManager = new HashManager()
            const hashPassword: string = await hashManager.generateHash(input.password)

            const id = generateId()
            const newUser = new User(id, input.name, input.email, hashPassword)

            await userDatabase.signup(newUser)
            
            const authenticator = new Authenticator()
            const token = await authenticator.generateToken({id})
            
            return token

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    login = async (input: inputLoginDTO): Promise<string> => {
        try {
            if (!input.email) {
                throw new MissingEmail()
            }
            if (!input.password) {
                throw new MissingPassword()
            }
    
            const userDatabase = new UserDatabase()
            const emailExists = await userDatabase.getUserBy("email", input.email)
            
            if (!emailExists) {
                throw new EmailNotFound()
            }
        
            const hashManager = new HashManager()
            const comparePassword = await hashManager.compareHash(input.password, emailExists.password)

            if (!comparePassword) {
                throw new IncorrectPassword()
            }
            
            const authenticator = new Authenticator()
            const token = await authenticator.generateToken({id: emailExists.id})
            
            return token
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    editUserInfo = async (input: inputEditUserInfoDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }

            const userDatabase = new UserDatabase()
            const authenticator = new Authenticator()
            
            const {id} = authenticator.getTokenData(input.token)
            
            const userExists = await userDatabase.getUserBy("id", id)

            if (!input.email) {
                input.email = userExists.email
            }
            if (!input.password) {
                input.password = userExists.password
            }
    
            const userInfo: updateUserInfoDTO = {
                id,
                email: input.email,
                password: input.password
            }

            await userDatabase.editUserInfo(userInfo)
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}