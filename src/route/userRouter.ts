import express from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserController } from "../controller/UserController"
import UserDatabase from "../data/UserDatabase"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"


export const userRouter = express.Router()
const userDatabase = new UserDatabase()
const userBusiness = new UserBusiness(userDatabase, new HashManager(), new Authenticator(), new IdGenerator())
const userController = new UserController(userBusiness)

userRouter.post("/signup", (req, res) => userController.signup(req, res))
userRouter.post("/login", (req, res) => userController.login(req, res))
userRouter.get("/profile", (req, res) => userController.getUserInfo(req, res))
userRouter.put("/profile/edit", (req, res) => userController.editUserInfo(req, res))
userRouter.patch("/recoverPassword", (req, res) => userController.recoverPassword(req, res))