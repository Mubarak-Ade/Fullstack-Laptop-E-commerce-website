import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./env.js";
const port = env.PORT || 3000;
const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server Running on Port ${port}`);
        });
    }
    catch (error) {
        console.error("Failed to start server", error);
        process.exit(1);
    }
};
startServer();
