import BaseDatabase from "./BaseDatabase"
import Product from "./Product"


export default class ProductDatabase extends BaseDatabase {
    TABLE_NAME = "Labecommerce_products"
    
    //Method that updates the product information in the database
    public async updateInfo (id: string, column: string, info: any) {
        super.update(id, column, info)
    }

    //Method that receives an id and returns the corresponding product
    public async getById(id: string) {
        return super.getById(id)
    }

    //Method that returns all products
    public async selectAllProducts (search: string, like: string, sort: string, order: string, size: number, offset: number) {
        let result
        
        if (size === -1 && offset === 2) {
            result = await BaseDatabase.connection(this.TABLE_NAME)
            .select()
            .where(sort, like, search)
            .orderBy(sort, order)
        
        } else {
            result = await BaseDatabase.connection(this.TABLE_NAME)
            .select()
            .where(sort, like, search)
            .orderBy(sort, order)
            .limit(size)
            .offset(offset)
        }
        
        return result
    }

    //Method that inserts a new product into the databate
    public async createProduct (product: Product) {
        super.create(product)    
    }
}