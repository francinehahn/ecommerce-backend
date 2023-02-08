import express from "express"
import { ProductBusiness } from "../business/ProductBusiness"
import { ProductController } from "../controller/ProductController"
import ProductDatabase from "../data/ProductDatabase"


export const productRouter = express.Router()
const productDatabase = new ProductDatabase()
const productBusiness = new ProductBusiness(productDatabase)
const productController = new ProductController(productBusiness)

productRouter.post("/", productController.createProduct)
productRouter.put("/:id", productController.editProductInfo)
productRouter.get("/", productController.getAllProducts)
productRouter.get("/user", productController.getProductsByUserId)