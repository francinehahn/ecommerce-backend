import Product, { getProductsDTO, inputEditProductInfoDTO, returnProductsDTO } from "../models/Product"


export interface ProductRepository {
    getProductsByUserId (id: string): Promise<returnProductsDTO[] | []>
    createProduct (newProduct: Product): Promise<void>
    editProductInfo (input: inputEditProductInfoDTO): Promise<void>
    getllProducts (getProducts: getProductsDTO): Promise<returnProductsDTO[]>
    getProductById (id: number): Promise<returnProductsDTO | undefined>
}