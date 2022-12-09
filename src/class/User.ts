export default class User {
    private id: string
    private name: string
    private email: string
    private password: string

    constructor(id: string, n: string, e: string, p: string) {
        this.id = id
        this.name = n
        this.email = e
        this.password = p
    }

    public getId () {
        return this.id
    }

    public getName () {
        return this.name
    }

    public getEmail () {
        return this.email
    }

    public getPassword () {
        return this.password
    }
}