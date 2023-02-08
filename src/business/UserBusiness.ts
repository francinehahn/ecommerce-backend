import UserDatabase from "../data/UserDatabase"
import User, { inputEditUserInfoDTO, inputLoginDTO, inputSignupDTO, updateUserInfoDTO } from "../models/User"
import { Authenticator } from "../services/Authenticator"
import { generateId } from "../services/generateId"


export class UserBusiness {

    signup = async (input: inputSignupDTO): Promise<string> => {
        try {
            if (!input.name) {
                throw new Error("Provide user name.")
            }
            if (!input.email) {
                throw new Error("Provide the email.")
            }
            if (!input.password) {
                throw new Error("Provide the password.")
            }
            if (input.password.length < 6) {
                throw new Error("The password must have at least 6 characters.")
            }
    
            const userDatabase = new UserDatabase()
            const userExists = await userDatabase.getUserBy("email", input.email)
            
            if (userExists) {
                throw new Error("User already registered.")
            }
    
            const id = generateId()
            const newUser = new User(id, input.name, input.email, input.password)

            await userDatabase.signup(newUser)
            
            const authenticator = new Authenticator()
            const token = await authenticator.generateToken({id})
            
            return token

        } catch (err: any) {
            throw new Error(err.message)
        }
    }


    login = async (input: inputLoginDTO): Promise<string> => {
        try {
            if (!input.email) {
                throw new Error ("Provide the user email.")
            }
            if (!input.password) {
                throw new Error ("Provide the user password.")
            }
    
            const userDatabase = new UserDatabase()
            const emailExists = await userDatabase.getUserBy("email", input.email)
            
            if (!emailExists) {
                throw new Error("Email not found.")
            }
        
            if (input.password !== emailExists.password) {
                throw new Error("Incorrect password.")
            }
            
            const authenticator = new Authenticator()
            const token = await authenticator.generateToken({id: emailExists.id})
            
            return token
    
        } catch (err: any) {
            throw new Error(err.message)
        }
    }


    editUserInfo = async (input: inputEditUserInfoDTO): Promise<void> => {
        try {
            const userDatabase = new UserDatabase()
            const authenticator = new Authenticator()
            const {id} = await authenticator.getTokenData(input.token)

            const userExists = await userDatabase.getUserBy("id", id)

            if (!input.email) {
                input.email = userExists.email
            }
            if (!input.password) {
                input.password = userExists.password
            }
            if (!input.token) {
                throw new Error("Provide the token.")
            }
    
            const userInfo: updateUserInfoDTO = {
                id,
                email: input.email,
                password: input.password
            }

            await userDatabase.editUserInfo(userInfo)
    
        } catch (err: any) {
            throw new Error(err.message)
        }
    }
}