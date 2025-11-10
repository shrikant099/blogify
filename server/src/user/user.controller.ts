import { Request, Response } from "express";
import { ApiError } from "../common/utils/apiError.js";
import { asyncHandler } from "../common/utils/asyncHandler.js";
import { User } from "./user.schema.js";
import { AuthenticatedRequest } from "../types/express/index.js"
import { BadRequestError } from "src/config/error/customError.config.js";
import uploadOnCloudinary from "src/common/utils/cloudinary.js";
// get current user 
export const getCurrentUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?._id;

        const user = await User.findById(userId).select("-password -resetOtp -resetOtpExpiry -isOtpVerified");
        if (!user) throw new ApiError(404, "User Not Found");

        return res.status(200).json({
            success: true,
            message: "User fetched Succesfull",
            data: user
        })
    } catch (error) {
        console.log(error);

    }
});

export const updateUserProfile = asyncHandler(async (req: any, res: Response) => {
    const userId = req.user?._id;
    if (!userId) return res.status(400).json({ message: "UserId missing" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Name update
    if (req.body.name) user.name = req.body.name;

    // File update (avatar)
    if (req.file) {
        const localFilePath = req.file.path;
        try {
            const secure_url = await uploadOnCloudinary(localFilePath); // Cloudinary upload
            user.avatar = secure_url || user.avatar;
        } catch (error) {
            console.error("Cloudinary error:", error);
        }
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user,
    });
});