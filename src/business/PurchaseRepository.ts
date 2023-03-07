import Purchase from "../models/Purchase"


export interface PurchaseRepository {
    getPurchasesByUserId (id: string): Promise<Purchase[] | []>
    createPurchase (newPurchase: Purchase): Promise<void>
    getSalesByProductId (id: number): Promise<any>
}