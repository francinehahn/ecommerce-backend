import { app } from "./app"
import { productRouter } from "./routes/productRouter"
import { purchaseRouter } from "./routes/purchaseRouter"
import { userRouter } from "./routes/userRouter"


app.use("/products", productRouter)
app.use("/users", userRouter)
app.use("/purchases", purchaseRouter)




