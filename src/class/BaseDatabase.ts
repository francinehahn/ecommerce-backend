import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

export default abstract class BaseDatabase {
    protected static connection = knex({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEMA,
            multipleStatements: true
        }
    })

    abstract TABLE_NAME: string

    //Method that receives an id and returns the corresponding data
    protected async getById (id: string) {
        const result = await BaseDatabase.connection.raw(`
            SELECT * FROM ${this.TABLE_NAME} WHERE id = '${id}';
        `)
        return result[0]
    }

    protected async create (item: any) {
        await BaseDatabase.connection.raw(`
            INSERT INTO ${this.TABLE_NAME} VALUES (${item});
        `)
    }
}