import { app } from "./app"
import { editProductInfo } from "./endpoints/editProductInfo"
import { editUserInfo } from "./endpoints/editUserInfo"
import { getAllProducts } from "./endpoints/getAllProducts"
import { getAllUsers } from "./endpoints/getAllUsers"
import { getPurchasesByUserId } from "./endpoints/getPurchasesByUserId"
import { makePurchase } from "./endpoints/makePurchase"
import { registerProduct } from "./endpoints/registerProduct"
import { createAccount } from "./endpoints/createAccount"
import { getProductsByUserId } from "./endpoints/getProductsByUserId"
import { login } from "./endpoints/login"
import { getSalesByUserId } from "./endpoints/getSalesByUserId"


// Register a new user
app.post('/users', createAccount)

//Get All Users
app.get('/users', getAllUsers)

//Edit user info
app.put('/users/:id/account', editUserInfo)

//Get purchases by user id
app.get('/users/:id/purchases', getPurchasesByUserId)

//Get products by user id
app.get('/users/:id/products', getProductsByUserId)

//Get Sales By User Id
app.get('/users/:id/sales', getSalesByUserId)

//Register a product
app.post('/users/:id/products', registerProduct)

//Get All Products
app.get('/products', getAllProducts)

//Edit product info
app.put('/products/:id', editProductInfo)

//Make a purchase
app.post('/purchases', makePurchase)

//Login
app.post('/login', login)