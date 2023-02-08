import { CustomError } from "./CustomError"


export class NoProductsRegistered extends CustomError {
    constructor () {
        super(422, "The user has not registered any products yet.")
    }
}

export class NoProductsFound extends CustomError {
    constructor () {
        super(404, "No products found with the given search parameters.")
    }
}

export class MissingProductId extends CustomError {
    constructor () {
        super(422, "Provide the product id.")
    }
}

export class MissingProductName extends CustomError {
    constructor () {
        super(422, "Provide the product name.")
    }
}

export class MissingPrice extends CustomError {
    constructor () {
        super(422, "Provide the price.")
    }
}

export class InvalidPrice extends CustomError {
    constructor () {
        super(422, "The price cannot be less than or equal to zero.")
    }
}

export class MissingImageUrl extends CustomError {
    constructor () {
        super(422, "Provide the image url.")
    }
}

export class ProductNotFound extends CustomError {
    constructor () {
        super(404, "Product not found.")
    }
}

export class InvalidOrder extends CustomError {
    constructor () {
        super(422, "The order must be asc or desc.")
    }
}

export class MissingInputProducts extends CustomError {
    constructor () {
        super(422, "Provide the product id and the quantity of each product.")
    }
}

