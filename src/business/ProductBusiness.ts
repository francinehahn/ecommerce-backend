import ProductDatabase from "../data/ProductDatabase"
import Product, { getProductsDTO, inputCreateProductDTO, inputEditProductInfoDTO, inputGetAllProductsDTO, productOrder, returnProductsDTO } from "../models/Product"
import { Authenticator } from "../services/Authenticator"


export class ProductBusiness {

    getProductsByUserId = async (token: string): Promise<returnProductsDTO[]> => {
        try {
            if (!token) {
                throw new Error("Provide the token.")
            }

            const authenticator = new Authenticator()
            const {id} = await authenticator.getTokenData(token)
    
            const productDatabase = new ProductDatabase()
            const productsByUserId = await productDatabase.getProductsByUserId(id)
            
            if (productsByUserId.length === 0) {
                throw new Error("The user has not registered any products yet.")
            }
    
            return productsByUserId
    
        } catch (err: any) {
            throw new Error(err.message)
        }
    }


    createProduct = async (input: inputCreateProductDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new Error("Provide the token.")
            }
            if (!input.name) {
                throw new Error("Provide the product name.")
            }
            if (!input.price) {
                throw new Error("Provide the price.")
            }
            if (!input.imageUrl) {
                throw new Error("Provide the image url.")
            }
            if (Number(input.price) <= 0) {
                throw new Error("Provide a valid price.")
            }

            const authenticator = new Authenticator()
            const {id} = await authenticator.getTokenData(input.token)
    
            const newProduct = new Product(input.name, input.price, input.imageUrl, id)

            const productDatabase = new ProductDatabase()
            await productDatabase.createProduct(newProduct)
    
        } catch (err: any) {
            throw new Error(err.message)
        }
    }


    editProductInfo = async (input: inputEditProductInfoDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new Error("Provide the token.")
            }

            const authenticator = new Authenticator()
            const {id} = await authenticator.getTokenData(input.token)

            if (input.id.toString() === ":id") {
                throw new Error("Provide the product id.")   
            }

            const productDatabase = new ProductDatabase()
            const productExists = await productDatabase.getProductById(input.id)

            if (!productExists) {
                throw new Error("Product not found.")
            }

            if (productExists.fk_user_id !== id) {
                throw new Error("This user cannot edit this product.")
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

            await productDatabase.editProductInfo(input)
    
        } catch (err: any) {
            throw new Error(err.message)
        }
    }


    getAllProducts = async (input: inputGetAllProductsDTO): Promise<returnProductsDTO[]> => {
        try {
            if (!input.order) {
              input.order = productOrder.ASC
            }
    
            if (input.order.toUpperCase() !== productOrder.ASC && input.order.toUpperCase() !== productOrder.DESC) {
                throw new Error("The order must be asc or desc.")
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

            const productDatabase = new ProductDatabase()
            const result = await productDatabase.getllProducts(getProducts)
            
            return result
    
        } catch (err: any) {
            throw new Error(err.message)
        }
    }
}