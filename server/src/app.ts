import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { uptime } from "process";
import { isHttpError } from "http-errors";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import path from "path";

const app = express();

app.use(morgan("dev"))

app.use( cors() );
app.use( express.json() );

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)

app.get( "/", ( req, res ) => {
    res.send( {
        message: "hello World"
    } );
} );

app.get( "/health", ( req, res ) => {
    res.status( 200 ).json( {
        status: "ok",
        uptime: uptime(),
        timeStamp: Date.now()
    } );
} );

app.use( ( error: unknown, req: Request, res: Response, next: NextFunction ) => {
    console.error( error );
    let errorMessage = "An Unknown Error occured";
    let statusCode = 500;
    if ( isHttpError( error ) ) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status( statusCode ).json( { error: errorMessage } );
} );

export default app;