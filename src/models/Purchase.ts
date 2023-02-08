export default class Purchase {
    private id: string
    private fk_user_id: string
    private fk_product_id:  number
    private quantity: number
    private total_price: number
    private created_at: Date
    
    constructor(id: string, ui: string, pi: number, q: number, tp: number, ca: Date) {
        this.id = id
        this.fk_user_id = ui
        this.fk_product_id = pi
        this.quantity = q
        this.total_price = tp
        this.created_at = ca
    }
}

interface product {
    productId: number,
    quantity: number
}

export interface inputCreatePurchaseDTO {
    products: product[],
    token: string
}

export interface returnSalesDTO {
    id: string,
    fk_user_id: string,
    fk_product_id: number,
    quantity: number,
    total_price: number,
    created_at: Date,
    product_name: string
}