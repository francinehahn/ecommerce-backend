import { Request, Response } from "express"
import { ProductBusiness } from "../business/ProductBusiness"
import { inputCreateProductDTO, inputEditProductInfoDTO, inputGetAllProductsDTO, productOrder } from "../models/Product"


export class ProductController {

    getProductsByUserId = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string

            const productBusiness = new ProductBusiness()
            const result = await productBusiness.getProductsByUserId(token)
    
            res.status(200).send(result)
    
        } catch (err: any) {
            res.status(400).send(err.message)
        }
    }


    createProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputCreateProductDTO = {
                name: req.body.name,
                price: req.body.price,
                imageUrl: req.body.imageUrl,
                token: req.headers.authorization as string
            }
    
            const productBusiness = new ProductBusiness()
            await productBusiness.createProduct(input)
            
            res.status(201).send('Success! The product has been registerd!')
    
        } catch (err: any) {
            res.status(400).send(err.message)
        }
    }


    editProductInfo = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputEditProductInfoDTO = {
                id: req.params.id,
                name: req.body.name,
                price: req.body.price,
                imageUrl: req.body.imageUrl,
                token: req.headers.token as string
            }

            const productBusiness = new ProductBusiness()
            await productBusiness.editProductInfo(input)
        
            res.status(201).send('Success! Product information has been edited!')
    
        } catch (err: any) {
            res.status(400).send(err.message)
        }
    }


    getAllProducts = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputGetAllProductsDTO = {
                order: req.query.order as productOrder,
                search: req.query.search as string,
                size: Number(req.query.size),
                page: Number(req.query.page)
            }
    
            const productBusiness = new ProductBusiness()
            const result = await productBusiness.getAllProducts(input)

            res.status(200).send(result)
    
        } catch (err: any) {
            res.status(400).send(err.message)
        }
    }
}