import express from "express"
import { ProductBusiness } from "../business/ProductBusiness"
import { ProductController } from "../controller/ProductController"
import ProductDatabase from "../data/ProductDatabase"
import { Authenticator } from "../services/Authenticator"


export const productRouter = express.Router()
const productDatabase = new ProductDatabase()
const productBusiness = new ProductBusiness(productDatabase, new Authenticator())
const productController = new ProductController(productBusiness)

productRouter.get("/", (req, res) => productController.getAllProducts(req, res))
productRouter.get("/user", (req, res) => productController.getProductsByUserId(req, res))
productRouter.post("/", (req, res) => productController.createProduct(req, res))
productRouter.put("/:id", (req, res) => productController.editProductInfo(req, res))
