import { Request, Response } from "express"
import ProductDatabase from "../class/ProductDatabase"


export const getAllProducts = async (req: Request, res: Response) => {
    let errorCode = 400
    
    try {
        let order = req.query.order as string
        let search = req.query.search as string
        let size = Number(req.query.size)
        let page = Number(req.query.page)
        
        const products = new ProductDatabase()

        if (!order) {
          order = "asc"  
        }

        if (order.toLowerCase() !== 'asc' && order.toLowerCase() !== 'desc') {
            errorCode = 422
            throw new Error("The order must be asc or desc.")
        }

        if (!search) {
            search = "%"
        }

        if (!size) {
            size = -1
        }

        if (!page) {
            page = -1
        }

        const offset = size * (page - 1)
        const result = await products.selectAllProducts(`%${search}%`, "like", "name", order, size, offset)

        res.status(200).send(result)

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}