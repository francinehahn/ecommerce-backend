import { app } from "./app"
import { productRouter } from "./route/productRouter"
import { purchaseRouter } from "./route/purchaseRouter"
import { userRouter } from "./route/userRouter"


app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/purchases", purchaseRouter)

