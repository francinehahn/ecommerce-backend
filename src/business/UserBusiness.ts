import { CustomError } from "../errors/CustomError"
import { DuplicateEmail, EmailNotFound, IncorrectPassword, InvalidEmail, InvalidPassword, MissingEmail, MissingPassword, MissingToken, MissingUserName } from "../errors/UserErrors"
import User, { inputEditUserInfoDTO, inputLoginDTO, inputSignupDTO, returnUserInfoDTO, updateUserInfoDTO } from "../models/User"
import { UserRepository } from "./UserRepository"
import { IhashManager } from "../models/IhashManager"
import { Iauthenticator } from "../models/Iauthenticator"
import { IidGenerator } from "../models/IidGenerator"


export class UserBusiness {
    constructor (
        private userDatabase: UserRepository,
        private hashManager: IhashManager,
        private authenticator: Iauthenticator,
        private idGenerator: IidGenerator
    ) {}

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
    
            const userExists = await this.userDatabase.getUserBy("email", input.email)
            
            if (userExists) {
                throw new DuplicateEmail()
            }
    
            const hashPassword: string = await this.hashManager.generateHash(input.password)

            const id = this.idGenerator.generateId()
            const newUser = new User(id, input.name, input.email, hashPassword)

            await this.userDatabase.signup(newUser)
            
            const token = await this.authenticator.generateToken({id})
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
    
            const emailExists = await this.userDatabase.getUserBy("email", input.email)
            
            if (!emailExists) {
                throw new EmailNotFound()
            }
        
            const comparePassword = await this.hashManager.compareHash(input.password, emailExists.password)

            if (!comparePassword) {
                throw new IncorrectPassword()
            }
            
            const token = await this.authenticator.generateToken({id: emailExists.id})
            return token
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getUserInfo = async (token: string): Promise<returnUserInfoDTO> => {
        try {
            if (!token) {
                throw new MissingToken()
            }

            const {id} = await this.authenticator.getTokenData(token)
            
            const userExists = await this.userDatabase.getUserBy("id", id)

            const result: returnUserInfoDTO = {
                name: userExists.name,
                email: userExists.email
            }

            return result
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    editUserInfo = async (input: inputEditUserInfoDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }

            const {id} = this.authenticator.getTokenData(input.token)
            
            const userExists = await this.userDatabase.getUserBy("id", id)
            
            if (!input.name) {
                input.name = userExists.name
            }

            if (!input.email) {
                input.email = userExists.email
            }

            if (!input.email.includes("@")) {
                throw new InvalidEmail()
            }

            const duplicateEmail = await this.userDatabase.getUserBy("email", input.email)
 
            if (duplicateEmail && duplicateEmail.email !== userExists.email) {
                throw new DuplicateEmail()
            }

            const userInfo: updateUserInfoDTO = {
                id,
                name: input.name,
                email: input.email
            }

            await this.userDatabase.editUserInfo(userInfo)
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}