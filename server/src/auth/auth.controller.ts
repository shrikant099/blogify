import type { Request, Response } from "express";
import { comparePassword, hashPassword } from "../common/utils/hashPassword.js";
import jwt from "jsonwebtoken";
import { generateOtp, sendMail, transformEmail } from "../common/utils/sendEmail.js";
import { decodeToken, generateOtpToken } from "../common/utils/jwtToken.js";
import { asyncHandler } from "../common/utils/asyncHandler.js"
import { ApiError } from "../common/utils/apiError.js";
import { User } from "../user/user.schema.js";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../config/error/customError.config.js";


// register
export const register = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) throw new BadRequestError("Fileds are required");

    const alreadyExist = await User.findOne({ email: email });
    if (alreadyExist) throw new BadRequestError("Email is already Exist")

    const hashPasswordd: string = await hashPassword(password);

    const user = await User.create({
        name,
        email,
        password: hashPasswordd
    })

    res.status(201).json({
        success: true,
        message: "User Registerd Succesfull",
        data: user
    })
});

// login
export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Fileds are required")
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new NotFoundError("Email not found")
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
        throw new BadRequestError("Invalid Password")
    }

    if (!process.env.JWT_SECRET) {
        throw new ApiError(500, "JWT secret not configured");
    }

    const token = jwt.sign(
        { _id: user._id, role: user.role, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "10d" }
    );

    res.cookie("authToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days
    })

    const { password: _, ...filterFields} = user.toObject()

    return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        token,
        data: filterFields
    });
});


// Sent OTP to email
export const sentOptToMail = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) throw new BadRequestError("Email is required to sent otp on mail")
    try {

        const user = await User.findOne({ email });
        if (!user) throw new NotFoundError("Email not found")

        const { otp, expiresAt } = generateOtp();
        user.resetOtp = otp;
        user.resetOtpExpiry = expiresAt;
        await user.save();

        await sendMail({
            to: email,
            subject: "Reset Your Password",
            html: `<p>Your OTP is <b> ${otp}</b>. It expires in 5 minutes.</p>`
        });

        const maskedEmail = await transformEmail(email)
        const token = generateOtpToken(email)
        res.json({
            success: true,
            message: "Otp sent successfully",
            email: maskedEmail,
            token

        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
})

// Verify Otp
export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
    const { otp, token } = req.body;

    try {
        if (!token) throw new BadRequestError("Token not provided")
        const email: string = decodeToken(token)
        const user = await User.findOne({ email });
        if (!user) throw new NotFoundError("Email not found")

        if (!user || user.resetOtp !== otp || user?.resetOtpExpiry && user?.resetOtpExpiry?.getTime() < Date.now()) {
            throw new BadRequestError()
        }

        user.isOtpVerified = true;
        user.resetOtp = null;
        user.resetOtpExpiry = null;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Otp Verified Successfully"
        })
    } catch (error: any) {
        throw new ApiError(500, error.message);
    }
})

// reset password
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {

    const { password, token } = req.body;
    const email: string = decodeToken(token)
    if (!token) throw new BadRequestError("Token is required")
    const user = await User.findOne({ email });

    if (!user || !user.isOtpVerified) throw new UnauthorizedError("Unauthorized please otp verification is required")
    const hashPasswordd = await hashPassword(password);
    user.isOtpVerified = false;
    user.password = hashPasswordd;
    await user.save()

    return res.status(200).json({
        success: true,
        message: "Password reset successful"
    })
})