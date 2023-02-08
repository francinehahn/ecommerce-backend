import { Request, Response } from "express"
import { PurchaseBusiness } from "../business/PurchaseBusiness"
import { inputCreatePurchaseDTO } from "../models/Purchase"


export class PurchaseController {

    getPurchasesByUserId = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string
        
            const purchaseBusiness = new PurchaseBusiness()
            const result = await purchaseBusiness.getPurchasesByUserId(token)
            res.status(200).send(result)
    
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    getSalesByUserId = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string
            
            const purchaseBusiness = new PurchaseBusiness()
            const result = await purchaseBusiness.getSalesByUserId(token)

            res.status(200).send(result)
    
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }


    createPurchase = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputCreatePurchaseDTO = {
                products: req.body.products,
                token: req.headers.authorization as string
            }

            const purchaseBusiness = new PurchaseBusiness()
            await purchaseBusiness.createPurchase(input)
     
            res.status(201).send('Success! Purchase has been registered!')
    
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}