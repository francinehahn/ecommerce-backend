export default class Purchase {
    private id: string
    private user_id: string
    private product_id: string
    private quantity: number
    private total_price: number
    private created_at: Date
    
    constructor(id: string, ui: string, pi: string, q: number, tp: number, ca: Date) {
        this.id = id
        this.user_id = ui
        this.product_id = pi
        this.quantity = q
        this.total_price = tp
        this.created_at = ca
    }
}

interface product {
    productId: string,
    quantity: number
}

export interface inputCreatePurchaseDTO {
    products: product[],
    token: string
}