import BaseDatabase from "./BaseDatabase"
import Product from "./Product"


export default class ProductDatabase extends BaseDatabase {
    TABLE_NAME = "Labecommerce_products"
    
    //Method that updates the product information in the database
    public async updateInfo (id: string, name: string, price: number, image_url: string) {
        await BaseDatabase.connection.raw(`
            UPDATE ${this.TABLE_NAME}
            SET name = '${name}', price = ${price}, image_url = '${image_url}'
            WHERE id = '${id}';
        `)
    }

    //Method that receives an id and returns the corresponding product
    public async getById(id: string) {
        return super.getById(id)
    }

    //Method that returns all products without any sorting filter
    public async selectAllProducts () {
        const result = await BaseDatabase.connection.raw(`
            SELECT * FROM ${this.TABLE_NAME};
        `)

        return result[0]
    }

    //Method that returns all products in order (asc or desc)
    public async selectAllProductsOrderedBy (order: string) {
        const result = await BaseDatabase.connection.raw(`
            SELECT * FROM ${this.TABLE_NAME} ORDER BY name ${order};
        `)

        return result[0]
    }

    //Method that filters products by name
    public async searchProducts (search: string) {
        const result = await BaseDatabase.connection.raw(`
            SELECT * FROM ${this.TABLE_NAME} WHERE name LIKE '%${search}%';
        `)

        return result[0]
    }

    //Method that returns products by the name and in order
    public async searchProductsAndOrder (search: string, order: string) {
        const result = await BaseDatabase.connection.raw(`
            SELECT * FROM ${this.TABLE_NAME} WHERE name LIKE '%${search}%' ORDER BY name ${order};
        `)

        return result[0]
    }

    //Method that inserts a new product into the databate
    public async createProduct (product: Product) {
        super.create(product)    
    }
}