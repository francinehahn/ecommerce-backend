import Database from "./Database"
import Product from "./Product"


export default class ProductDatabase extends Database {
    //Method that updates the product information in the database
    public async updateInfo (id: string, name: string, price: number, image_url: string) {
        await Database.connection.raw(`
            UPDATE Labecommerce_products
            SET name = '${name}', price = ${price}, image_url = '${image_url}'
            WHERE id = '${id}';
        `)
    }

    //Method that returns all products registered in the database
    public async getProducts() {
        const result = await Database.connection.raw(`
            SELECT * FROM Labecommerce_products;
        `)
        return result[0]
    }

    //Method that receives an id and returns the corresponding product
    public async getProductById(id: string) {
        const result = await Database.connection.raw(`
            SELECT * FROM Labecommerce_products WHERE id = '${id}';
        `)
        return result[0]
    }

    //Method that returns all products without any sorting filter
    public async selectAllProducts () {
        const result = await Database.connection.raw(`
            SELECT * FROM Labecommerce_products;
        `)

        return result[0]
    }

    //Method that returns all products in order (asc or desc)
    public async selectAllProductsOrderedBy (order: string) {
        const result = await Database.connection.raw(`
            SELECT * FROM Labecommerce_products ORDER BY name ${order};
        `)

        return result[0]
    }

    //Method that filters products by name
    public async searchProducts (search: string) {
        const result = await Database.connection.raw(`
            SELECT * FROM Labecommerce_products WHERE name LIKE '%${search}%';
        `)

        return result[0]
    }

    //Method that returns products by the name and in order
    public async searchProductsAndOrder (search: string, order: string) {
        const result = await Database.connection.raw(`
            SELECT * FROM Labecommerce_products WHERE name LIKE '%${search}%' ORDER BY name ${order};
        `)

        return result[0]
    }

    //Method that inserts a new product into the databate
    public async postProduct (id: string, name: string, price: number, image_url: string) {
        await Database.connection.raw(`
            INSERT INTO Labecommerce_products
            VALUES ('${id}', '${name}', ${price}, '${image_url}');
        `)
}
}