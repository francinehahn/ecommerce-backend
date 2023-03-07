import { app } from "./app"
import { productRouter } from "./route/productRouter"
import { purchaseRouter } from "./route/purchaseRouter"
import { userRouter } from "./route/userRouter"


app.use("/users", userRouter)
app.use("/users", purchaseRouter)
app.use("/products", productRouter)

