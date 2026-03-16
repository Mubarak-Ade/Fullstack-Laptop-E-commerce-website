import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { uptime } from 'process';
import { isHttpError } from 'http-errors';
import morgan from 'morgan';
import productRoutes from '../src/modules/routes/product.routes.js';
import cartRoutes from '../src/modules/routes/cart.routes.js';
import orderRoutes from '../src/modules/routes/order.routes.js';
import userRoutes from '../src/modules/routes/user.route.js';
import AdminRoutes from '../src/admin/routes/main.routes.js';
import paymentRoutes from '../src/modules/routes/payment.route.js';
import path from 'path';
import { attachUser, requireAuth } from '../src/middlewares/authorization.js';
import connectDB from "../src/config/db.js"

const app = express();

app.use(morgan('dev'));

app.use(attachUser);

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use(cookieParser());

app.use('/api/payment/webhook/paystack', express.raw({ type: 'application/json' }));

app.use(express.json());

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database connection failed:', error);
        res.status(503).json({ 
            error: 'Database connection failed',
            message: 'Service temporarily unavailable'
        });
    }
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/admin', AdminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', requireAuth, orderRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
    res.send({
        message: 'hello World',
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        uptime: uptime(),
        timeStamp: Date.now(),
    });
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = 'An Unknown Error occured';
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;
