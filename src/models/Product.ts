export default class Product {
    private name: string
    private price: number
    private image_url: string
    private fk_userId: string

    constructor(n: string, p: number, i: string, fk: string) {
        this.name = n
        this.price = p
        this.image_url = i
        this.fk_userId = fk
    }
}

export interface inputCreateProductDTO {
    name: string,
    price: number,
    imageUrl: string,
    token: string
}

export interface inputEditProductInfoDTO {
    id: string,
    name: string,
    price: number,
    imageUrl: string,
    token: string
}

export enum productOrder {
    ASC = "ASC",
    DESC = "DESC"
}

export interface inputGetAllProductsDTO {
    order: productOrder,
    search: string,
    size: number,
    page: number
}

export interface getProductsDTO {
    search: string,
    order: string,
    size: number,
    offset: number
}
