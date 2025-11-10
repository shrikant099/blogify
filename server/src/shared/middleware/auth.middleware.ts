import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies?.authToken; 

  
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string; email: string; role: string };
        req.user = decoded; // ✅ Type-safe
        next();
    } catch {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};
