import { ProductRepository } from "../../src/business/ProductRepository"
import Product, { getProductsDTO, inputEditProductInfoDTO, returnProductsDTO } from "../../src/models/Product"


export default class ProductDatabaseMock implements ProductRepository {
    
    getProductsByUserId = async (id: string): Promise<returnProductsDTO[]> => {
        
    }


    createProduct = async (newProduct: Product): Promise<void> => {
      
    }


    editProductInfo = async (input: inputEditProductInfoDTO): Promise<void> => {
        
    }


    getllProducts = async (getProducts: getProductsDTO): Promise<returnProductsDTO[]> => {
        
    }


    getProductById = async (id: number): Promise<any> => {
        
    }
}