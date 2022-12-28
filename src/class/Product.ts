export default class Product {
    private id: string
    private name: string
    private price: number
    private image_url: string
    private fk_userId: string

    constructor(id: string, n: string, p: number, i: string, fk: string) {
        this.id = id
        this.name = n
        this.price = p
        this.image_url = i
        this.fk_userId = fk
    }
}