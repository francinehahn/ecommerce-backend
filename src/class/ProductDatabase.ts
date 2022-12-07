import {Knex} from "knex"
import Product from "./Product"


export default class ProductDatabase {
    constructor(private connection: Knex) {
        this.connection = connection
    }

    public async insertProduct(newProduct: Product) {
        await this.connection.raw(`
            INSERT INTO Labecommerce_products VALUES(${newProduct});
        `)
    }

    /*public async updateInfo (newProductInfo: Product) {
        await this.connection.raw(`
            UPDATE Labecommerce_products
            SET name = '${newProductInfo.name}', price = ${newProductInfo.price}, image_url = '${newProductInfo.image_url}'
            WHERE id = '${newProductInfo.id}';
        `)
    }*/

    public async getProducts() {
        const result = await this.connection.raw(`
            SELECT * FROM Labecommerce_products;
        `)
        return result
    }
}