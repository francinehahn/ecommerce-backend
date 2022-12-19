import { app } from "./app"
import { editProductInfo } from "./endpoints/editProductInfo"
import { editUserInfo } from "./endpoints/editUserInfo"
import { getAllProducts } from "./endpoints/getAllProducts"
import { getAllUsers } from "./endpoints/getAllUsers"
import { getPurchasesById } from "./endpoints/getPurchasesById"
import { makePurchase } from "./endpoints/makePurchase"
import { registerProduct } from "./endpoints/registerProduct"
import { createAccount } from "./endpoints/createAccount"
import { getProductById } from "./endpoints/getProductById"


// Register a new user
app.post('/users', createAccount)

//Get All Users
app.get('/users', getAllUsers)

//Edit user info
app.put('/users/:id/account', editUserInfo)

//Get purchases by id
app.get('/users/:user_id/purchases', getPurchasesById)

//Get All Products
app.get('/products', getAllProducts)

//Register a product
app.post('/products', registerProduct)

//Get product by id
app.get('/products/:id', getProductById)

//Edit product info
app.put('/products/:id', editProductInfo)

//Make a purchase
app.post('/purchases', makePurchase)