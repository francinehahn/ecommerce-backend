import { ProductRepository } from "../../src/business/ProductRepository"
import Product, { getProductsDTO, inputEditProductInfoDTO, returnProductsDTO } from "../../src/models/Product"
import { ProductsMock } from "./ProductsMock"


export default class ProductDatabaseMock implements ProductRepository {
    
    getProductsByUserId = async (id: string): Promise<returnProductsDTO[] | []> => {
        const filter = ProductsMock.filter(item => item.fk_user_id === id)
        return filter
    }

    createProduct = async (newProduct: Product): Promise<void> => {}

    editProductInfo = async (input: inputEditProductInfoDTO): Promise<void> => {}

    getllProducts = async (getProducts: getProductsDTO): Promise<returnProductsDTO[]> => {
        return ProductsMock
    }

    getProductById = async (id: number): Promise<returnProductsDTO | undefined> => {
        const filter = ProductsMock.filter(item => item.id === id)
        return filter[0]
    }
}