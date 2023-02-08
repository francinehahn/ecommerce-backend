import { CustomError } from "../errors/CustomError"
import { InvalidOrder, InvalidPrice, MissingImageUrl, MissingPrice, MissingProductId, MissingProductName, NoProductsFound, NoProductsRegistered, ProductNotFound } from "../errors/ProductErrors"
import { MissingToken, Unauthorized } from "../errors/UserErrors"
import Product, { getProductsDTO, inputCreateProductDTO, inputEditProductInfoDTO, inputGetAllProductsDTO, productOrder, returnProductsDTO } from "../models/Product"
import { Authenticator } from "../services/Authenticator"
import { ProductRepository } from "./ProductRepository"


export class ProductBusiness {
    constructor (private productDatabase: ProductRepository) {}

    getProductsByUserId = async (token: string): Promise<returnProductsDTO[]> => {
        try {
            if (!token) {
                throw new MissingToken()
            }

            const authenticator = new Authenticator()
            const {id} = await authenticator.getTokenData(token)
    
            const productsByUserId = await this.productDatabase.getProductsByUserId(id)
            
            if (productsByUserId.length === 0) {
                throw new NoProductsRegistered()
            }
    
            return productsByUserId
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    createProduct = async (input: inputCreateProductDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (!input.name) {
                throw new MissingProductName()
            }
            if (!input.price) {
                throw new MissingPrice()
            }
            if (!input.imageUrl) {
                throw new MissingImageUrl()
            }
            if (Number(input.price) <= 0) {
                throw new InvalidPrice()
            }

            const authenticator = new Authenticator()
            const {id} = await authenticator.getTokenData(input.token)
    
            const newProduct = new Product(input.name, input.price, input.imageUrl, id)

            await this.productDatabase.createProduct(newProduct)
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    editProductInfo = async (input: inputEditProductInfoDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }

            const authenticator = new Authenticator()
            const {id} = await authenticator.getTokenData(input.token)

            if (input.id.toString() === ":id") {
                throw new MissingProductId() 
            }

            const productExists = await this.productDatabase.getProductById(input.id)

            if (!productExists) {
                throw new ProductNotFound()
            }

            if (productExists.fk_user_id !== id) {
                throw new Unauthorized()
            }

            if (!input.name) {
                input.name = productExists.name
            }
            
            if (!input.price) {
                input.price = productExists.price
            }
    
            if (!input.imageUrl) {
                input.imageUrl = productExists.image_url
            }

            await this.productDatabase.editProductInfo(input)
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }


    getAllProducts = async (input: inputGetAllProductsDTO): Promise<returnProductsDTO[]> => {
        try {
            if (!input.order) {
              input.order = productOrder.ASC
            }
    
            if (input.order.toUpperCase() !== productOrder.ASC && input.order.toUpperCase() !== productOrder.DESC) {
                throw new InvalidOrder()
            }
    
            if (!input.search) {
                input.search = "%"
            }
    
            if (!input.size) {
                input.size = 10
            }
    
            if (!input.page) {
                input.page = 1
            }
    
            const offset = input.size * (input.page - 1)
            
            const getProducts: getProductsDTO = {
                search: input.search,
                order: input.order,
                size: input.size,
                offset
            }

            const result = await this.productDatabase.getllProducts(getProducts)
            if (result.length === 0) {
                throw new NoProductsFound()
            }
            
            return result
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}