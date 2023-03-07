import express from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserController } from "../controller/UserController"
import UserDatabase from "../data/UserDatabase"


export const UserRouter = express.Router()
const userDatabase = new UserDatabase()
const userBusiness = new UserBusiness(userDatabase)
const userController = new UserController(userBusiness)

UserRouter.post('/signup', userController.signup)
UserRouter.post('/login', userController.login)
UserRouter.put('/account', userController.editUserInfo)
