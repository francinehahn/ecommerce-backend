import { PurchaseRepository } from "../../src/business/PurchaseRepository"
import Purchase from "../../src/models/Purchase"


export default class PurchaseDatabaseMock implements PurchaseRepository {
    
    getPurchasesByUserId = async (id: string): Promise<Purchase[]> => {
    
    }


    createPurchase = async (newPurchase: Purchase): Promise<void> => {
       
    }


    getSalesByProductId = async (id: number): Promise<any> => {
      
    }
}