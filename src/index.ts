import { app } from "./app"
import { ProductController } from "./controller/ProductController"
import { PurchaseController } from "./controller/PurchaseController"
import { UserController } from "./controller/UserController"


const userController = new UserController()
const productController = new ProductController()
const purchaseController = new PurchaseController()

// Register a new user
app.post('/users/signup', userController.signup)

//Login
app.post('/users/login', userController.login)

//Edit user info
app.put('/users/account', userController.editUserInfo)

//Get products by user id
app.get('/products/user', productController.getProductsByUserId)

//Register a product
app.post('/products', productController.createProduct)

//Get All Products
app.get('/products', productController.getAllProducts)

//Edit product info
app.put('/products/:id', productController.editProductInfo)

//Get purchases by user id
app.get('/purchases', purchaseController.getPurchasesByUserId)

//Make a purchase
app.post('/purchases', purchaseController.createPurchase)

//Get Sales By User Id
app.get('/sales', purchaseController.getSalesByUserId)