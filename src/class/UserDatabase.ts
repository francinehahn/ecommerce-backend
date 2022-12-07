import { Knex } from "knex"
import User from "./User"

export default class UserDatabase {
    constructor(private connection: Knex){
        this.connection = connection
    }

    public async insertUser(newUser: User) {
        await this.connection.raw(`
            INSERT INTO Labecommerce_users VALUES(${newUser});
        `)
    }

    /*public async updateInfo (newUserInfo: User) {
        await this.connection.raw(`
            UPDATE Labecommerce_users SET email = '${newUserInfo.email}', password = '${newUserInfo.password}'
            WHERE id = '${newUserInfo.id}';
        `)
    }*/

    public async getUsers() {
        const result = await this.connection.raw(`
            SELECT * FROM Labecommerce_users;
        `)
        return result
    }
}