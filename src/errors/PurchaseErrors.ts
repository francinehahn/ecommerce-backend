import { CustomError } from "./CustomError"


export class NoPurchasesFound extends CustomError {
    constructor () {
        super(422, "This user has not made any purchases yet.")
    }
}

export class NoSalesFound extends CustomError {
    constructor () {
        super(422, "This user has not made any sales yet.")
    }
}