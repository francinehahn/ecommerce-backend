import { PurchaseRepository } from "../../src/business/PurchaseRepository"
import Purchase, { outputGetPurchasesByUserId } from "../../src/models/Purchase"
import { PurchasesMock } from "./PurchasesMock"


export default class PurchaseDatabaseMock implements PurchaseRepository {
    
    getPurchasesByUserId = async (id: string): Promise<outputGetPurchasesByUserId[] | []> => {
        const filter = PurchasesMock.filter(item => item.fk_user_id === id)
        return filter
    }

    createPurchase = async (newPurchase: Purchase): Promise<void> => {}

    getSalesByProductId = async (id: number): Promise<any> => {
        const filter = PurchasesMock.filter(item => item.fk_product_id === id)
        return filter
    }
}