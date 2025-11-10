import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import passport from "passport";
import { errorHandler } from "./config/error/error.config.js";
import { databaseConnection } from "./config/db/database.db.js";
import authRouter from "./auth/auth.routes.js";
import userRouter from "./user/user.routes.js";
import path from "path";
import blogRouter from "./blog/blog.routes.js";
dotenv.config();

const app = express();

import { fileURLToPath } from "url";
import adminRouter from "./admin/admin.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173",credentials: true }))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())
app.use("/uploads", express.static(path.join(__dirname, "public/uploads"))); // static folder

// routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/blog" , blogRouter);
app.use("/api/admin" , adminRouter);


app.get("/", (req: Request, res: Response) => {
    res.send("Hello from express")
})

app.use(errorHandler);
app.listen(process.env.PORT || 4000, async () => {
    await databaseConnection()
    console.log(`Server is listening on URL: http://localhost:${process.env.PORT || 4000}`)
})
