import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../../common/utils/apiError"
interface AppError extends Error {
    statusCode?: number;
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message,
        });
    } else {
        return res.status(500).json({
            success: false,
            message: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message || "Internal Server Error",
        });
    }
};
