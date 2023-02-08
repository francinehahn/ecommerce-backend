import express from "express"
import { ProductBusiness } from "../business/ProductBusiness"
import { ProductController } from "../controller/ProductController"
import ProductDatabase from "../data/ProductDatabase"


export const ProductRouter = express.Router()
const productDatabase = new ProductDatabase()
const productBusiness = new ProductBusiness(productDatabase)
const productController = new ProductController(productBusiness)

ProductRouter.post("/", productController.createProduct)
ProductRouter.put("/:id", productController.editProductInfo)
ProductRouter.get("/", productController.getAllProducts)
ProductRouter.get("/user", productController.getProductsByUserId)