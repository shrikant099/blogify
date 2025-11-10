import { Request, Response } from "express";
import mongoose from "mongoose";
import { Blog } from "src/blog/blog.schema";
import { asyncHandler } from "src/common/utils/asyncHandler";
import { BadRequestError, NotFoundError } from "src/config/error/customError.config";
import { AuthenticatedRequest } from "src/types/express";
import { User } from "src/user/user.schema";

// Get All Users
export const getAllUsers = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user._id;
    if (!user) throw new BadRequestError("");

    const users = await User.find({}).select("-password -isOtpVerified -resetOtp -resetOtpExpiry");
    return res.status(200).json({
        message: "Users Fetched Succesfull",
        success: true,
        data: users
    })
})

// Delete User
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.body;
    if (!userId) throw new BadRequestError("");

    const user = await User.findById(userId);
    if (!user) throw new NotFoundError("User Not Found!");

    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) throw new BadRequestError();

    return res.status(200).json({
        message: "User Deleted Successfully",
        success: true
    })
});

// update user role
export const updateUserRole = asyncHandler(async (req: Request, res: Response) => {
    console.log("In update controller");

    const { userId, role } = req.body;
    if (!userId) throw new BadRequestError("");

    const user = await User.findById(userId);
    if (!user) throw new NotFoundError("User Not Found!");

    const updateUser = await User.findByIdAndUpdate(userId, { role: role }, { new: true })
    if (!updateUser) throw new BadRequestError();

    return res.status(200).json({
        message: "User role is changed succesfull",
        success: true
    });
});


// delete Blog
export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
    const { blogId } = req.body;
    if (!blogId) throw new BadRequestError("Blog id not found");

    const blog = await Blog.findById(blogId);
    if (!blog) throw new NotFoundError("Blog Not Found!");

    const deleteBlog = await Blog.findByIdAndDelete(blogId);
    return res.status(200).json({
        message: "Blog Deleted Succesfull",
        success: true
    })
})