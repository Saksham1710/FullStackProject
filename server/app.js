import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
const corsOptions = {
    origin: 'https://brewbox-five.vercel.app', // Your frontend URL
    methods: 'GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

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
