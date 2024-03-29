import express from "express"
import { PurchaseBusiness } from "../business/PurchaseBusiness"
import { PurchaseController } from "../controller/PurchaseController"
import ProductDatabase from "../data/ProductDatabase"
import PurchaseDatabase from "../data/PurchaseDatabase"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"


export const purchaseRouter = express.Router()
const purchaseDatabase = new PurchaseDatabase()
const productDatabase = new ProductDatabase()
const purchaseBusiness = new PurchaseBusiness(purchaseDatabase, productDatabase, new Authenticator(), new IdGenerator())
const purchaseController = new PurchaseController(purchaseBusiness)

purchaseRouter.get("/sales", (req, res) => purchaseController.getSalesByUserId(req, res))
purchaseRouter.get("/purchases", (req, res) => purchaseController.getPurchasesByUserId(req, res))
purchaseRouter.post("/purchases", (req, res) => purchaseController.createPurchase(req, res))