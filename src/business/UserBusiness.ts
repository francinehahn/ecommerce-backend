import { CustomError } from "../errors/CustomError"
import { DuplicateEmail, EmailNotFound, IncorrectPassword, InvalidEmail, InvalidPassword, MissingEmail, MissingPassword, MissingToken, MissingUserName } from "../errors/UserErrors"
import User, { inputEditUserInfoDTO, inputLoginDTO, inputSignupDTO, returnUserInfoDTO, updatePasswordDTO, updateUserInfoDTO } from "../models/User"
import { UserRepository } from "./UserRepository"
import { IhashManager } from "../models/IhashManager"
import { Iauthenticator } from "../models/Iauthenticator"
import { IidGenerator } from "../models/IidGenerator"
import { MailTransporter } from "../services/MailTransporter"
import { PasswordGenerator } from "../services/PasswordGenerator"


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


    recoverPassword = async (email: string): Promise<void> => {
        try {
            if (!email) {
                throw new MissingEmail()
            }
        
            const emailExists = await this.userDatabase.getUserBy("email", email)
            if (!emailExists) {
                throw new EmailNotFound()
            }

            const newPassword = new PasswordGenerator().generatePassword()
            const hashPassword = await this.hashManager.generateHash(newPassword)

            const updatePassword: updatePasswordDTO = {
                id: emailExists.id,
                password: hashPassword
            }

            await this.userDatabase.recoverPassword(updatePassword)
            
            await new MailTransporter().createTransport().sendMail({
                from: process.env.NODEMAILER_USER,
                to: email,
                subject: "Cookenu - Recuperação de senha",
                text: `Conforme solicitado, segue a nova senha gerada: ${newPassword}`,
                html: `<p>Conforme solicitado, segue a nova senha gerada: ${newPassword}</p>`
            })

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}