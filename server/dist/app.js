import "dotenv/config";
import express from "express";
import cors from "cors";
import { uptime } from "process";
import { isHttpError } from "http-errors";
import morgan from "morgan";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import userRoutes from "./routes/user.route.js";
import paymentRoutes from "./routes/payment.route.js";
import path from "path";
import { attachUser, requireAuth } from "./middlewares/authorization.js";
const app = express();
app.use(morgan("dev"));
app.use(attachUser);
app.use(cors());
app.use(express.json());
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/user', userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", requireAuth, orderRoutes);
app.use("/api/payment", requireAuth, paymentRoutes);
app.get("/", (req, res) => {
    res.send({
        message: "hello World"
    });
});
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        uptime: uptime(),
        timeStamp: Date.now()
    });
});
app.use((error, req, res, next) => {
    console.error(error);
    let errorMessage = "An Unknown Error occured";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});
export default app;
