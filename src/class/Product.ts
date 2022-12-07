export default class Product {
    private id: string
    private name: string
    private price: number
    private image_url: string

    constructor(id: string, n: string, p: number, i: string) {
        this.id = id
        this.name = n
        this.price = p
        this.image_url = i
    }
}