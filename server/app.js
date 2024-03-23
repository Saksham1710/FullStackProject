import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', 'https://fullstackproject-production-db0c.up.railway.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            message: err.message,
            errors: err.errors,
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined
        });
    }
});


app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import userRouter from "./routes/user.routes.js";
import api_router from "./routes/api.routes.js";

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1", api_router);

export { app };
