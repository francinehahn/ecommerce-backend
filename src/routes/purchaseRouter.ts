import express from "express"
import { PurchaseBusiness } from "../business/PurchaseBusiness"
import { PurchaseController } from "../controller/PurchaseController"
import ProductDatabase from "../data/ProductDatabase"
import PurchaseDatabase from "../data/PurchaseDatabase"

export const PurchaseRouter = express.Router()
const purchaseDatabase = new PurchaseDatabase()
const productDatabase = new ProductDatabase()
const purchaseBusiness = new PurchaseBusiness(purchaseDatabase, productDatabase)
const purchaseController = new PurchaseController(purchaseBusiness)

PurchaseRouter.get('/user', purchaseController.getPurchasesByUserId)
PurchaseRouter.post('/', purchaseController.createPurchase)
PurchaseRouter.get('/sales', purchaseController.getSalesByUserId)