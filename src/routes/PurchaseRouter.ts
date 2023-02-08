import express from "express"
import { PurchaseBusiness } from "../business/PurchaseBusiness"
import { PurchaseController } from "../controller/PurchaseController"
import ProductDatabase from "../data/ProductDatabase"
import PurchaseDatabase from "../data/PurchaseDatabase"

export const purchaseRouter = express.Router()
const purchaseDatabase = new PurchaseDatabase()
const productDatabase = new ProductDatabase()
const purchaseBusiness = new PurchaseBusiness(purchaseDatabase, productDatabase)
const purchaseController = new PurchaseController(purchaseBusiness)

purchaseRouter.get('/user', purchaseController.getPurchasesByUserId)
purchaseRouter.post('/', purchaseController.createPurchase)
purchaseRouter.get('/sales', purchaseController.getSalesByUserId)