import Purchase, { outputGetPurchasesByUserId } from "../models/Purchase"


export interface PurchaseRepository {
    getPurchasesByUserId (id: string): Promise<outputGetPurchasesByUserId[] | []>
    createPurchase (newPurchase: Purchase): Promise<void>
    getSalesByProductId (id: number): Promise<any>
}