import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
// app.use(cors());
// const corsOptions = {
//     origin: 'http://localhost:3000', 
//     methods: 'GET, POST, PUT, PATCH, DELETE',
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// };
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 
    next();
  })



// app.use(cors(corsOptions));

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            message: err.message,
            errors: err.errors,
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined
        });
    }
});


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import userRouter from "./routes/user.routes.js";
import api_router from "./routes/api.routes.js";

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1", api_router);

export { app };
