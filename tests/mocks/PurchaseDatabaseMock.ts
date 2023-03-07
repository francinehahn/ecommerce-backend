import { PurchaseRepository } from "../../src/business/PurchaseRepository"
import Purchase from "../../src/models/Purchase"
import { PurchasesMock } from "./PurchasesMock"


export default class PurchaseDatabaseMock implements PurchaseRepository {
    
    getPurchasesByUserId = async (id: string): Promise<Purchase[] | []> => {
        const filter = PurchasesMock.filter(item => item.getUserId() === id)
        return filter
    }

    createPurchase = async (newPurchase: Purchase): Promise<void> => {}

    getSalesByProductId = async (id: number): Promise<any> => {
        const filter = PurchasesMock.filter(item => item.getProductId() === id)
        return filter
    }
}