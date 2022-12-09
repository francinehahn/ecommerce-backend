export default class Purchase {
    private id: string
    private user_id: string
    private product_id: string
    private quantity: number
    private total_price: number
    
    constructor(id: string, ui: string, pi: string, q: number, tp: number) {
        this.id = id
        this.user_id = ui
        this.product_id = pi
        this.quantity = q
        this.total_price = tp
    }

    public getId () {
        return this.id
    }

    public getUserId () {
        return this.user_id
    }

    public getProductId () {
        return this.product_id
    }

    public getQuantity () {
        return this.quantity
    }

    public getTotalPrice () {
        return this.total_price
    }
}