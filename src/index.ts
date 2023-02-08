import { app } from "./app"
import { ProductRouter } from "./routes/productRouter"
import { PurchaseRouter } from "./routes/purchaseRouter"
import { UserRouter } from "./routes/userRouter"


app.use("/products", ProductRouter)
app.use("/users", UserRouter)
app.use("/purchases", PurchaseRouter)




