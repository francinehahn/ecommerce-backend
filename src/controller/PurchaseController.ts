import { Request, Response } from "express"
import { PurchaseBusiness } from "../business/PurchaseBusiness"
import { inputCreatePurchaseDTO } from "../models/Purchase"


export class PurchaseController {
    constructor (private purchaseBusiness: PurchaseBusiness) {}

    getPurchasesByUserId = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string
        
            const result = await this.purchaseBusiness.getPurchasesByUserId(token)
            res.status(200).send(result)
    
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    getSalesByUserId = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string
            
            const result = await this.purchaseBusiness.getSalesByUserId(token)
            res.status(200).send(result)
    
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    createPurchase = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputCreatePurchaseDTO = {
                products: req.body,
                token: req.headers.authorization as string
            }

            await this.purchaseBusiness.createPurchase(input)
            res.status(201).send('Success! Purchase has been registered!')
    
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}