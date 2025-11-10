import { Request, Response, Router } from "express";
import { login, register, resetPassword, sentOptToMail, verifyOtp } from "../auth/auth.controller.js";
import { isAuthenticated } from "../shared/middleware/auth.middleware.js"
import passport from "passport";
import jwt from 'jsonwebtoken';
import { asyncHandler } from "../common/utils/asyncHandler.js";
import { ApiError } from "../common/utils/apiError.js";

const authRouter = Router();

// Login and register Api's
authRouter.post("/register", register)
authRouter.post("/login", login);

// logout api
authRouter.get("/logout", isAuthenticated, asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "UnAuthorized");
    res.clearCookie("authToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });
    return res.status(200).json({
        success: true,
        message: "Logout Succesfull"
    })
}));

// Reset Password Api's
authRouter.post("/sent-otp", sentOptToMail)
authRouter.post("/verify-otp", verifyOtp)
authRouter.post("/reset-password", resetPassword)

// Google login
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))
// callback 
authRouter.get("/google/callback", passport.authenticate("google", { session: false }), (req: any, res) => {
    const token = jwt.sign(
        { id: req.user._id, email: req.user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    );

    res.json({
        success: true,
        message: "Google Login Success",
        token
    })
})

export default authRouter