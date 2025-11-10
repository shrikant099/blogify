import { asyncHandler } from "../common/utils/asyncHandler";
import { BadRequestError, NotFoundError, ServerRespopnseError, UnauthorizedError } from "../config/error/customError.config"
import { AuthenticatedRequest } from "../types/express";
import { Blog } from "./blog.schema";
import { User } from "src/user/user.schema";
import { Request, Response } from "express";
import uploadOnCloudinary, { getPublicId } from "src/common/utils/cloudinary";
import { ROLE } from "src/types/user/user.types";
import { v2 as cloudinary } from "cloudinary"
import mongoose from "mongoose";

// create blog
export const createBlog = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user._id;
    const { title, content, tags, category } = req.body || {};
    if (!(req as any).file) throw new BadRequestError("Image is required");
    if (!userId) throw new BadRequestError("UnAuthorized author is requ ired");
    if (!title || !content || !tags?.length || !category.trim()) throw new BadRequestError("Fields are missing");

    const validUser = await User.findById(userId)
    if (!validUser) throw new NotFoundError("User Not found");
    if (validUser.role !== ROLE.USER) throw new BadRequestError("Unauthorized: You cannot create a blog");

    const tagsArray = (tags as string).split(",").map(tag => tag.trim()).filter(tag => tag);

    const blog = new Blog({
        title: title,
        content: content,
        tags: tagsArray,
        category,
        author: validUser._id,
        image: ""
    })

    await blog.save();
    res.status(201).json({
        success: true,
        message: "Blog Created Successfull",
        data: blog
    })

    if (req?.file) {
        const localFilePath = req?.file?.path as string;
        if (!localFilePath) throw new BadRequestError("Local File Path is required");
        try {
            const secure_url = await uploadOnCloudinary(localFilePath);
            // update blog after image upload on cloudinary;
            if (!secure_url) {
                return res.status(500).json({
                    success: false,
                    message: "Secure Url is not received from Cloudinary!"
                })
            }
            blog.image = secure_url;
            await blog.save();

        } catch (error: any) {
            throw new ServerRespopnseError(error.message || "Internal Server Error!")
        }
    }
});

// updata blog
export const updateBlog = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { title, content, tags, category } = req.body;
    const userId = req.user._id;
    const { blogId } = req.params;
    if (!userId) throw new BadRequestError("UnAuthorized author is required");

    const validUser = await User.findById(userId);
    if (!validUser) throw new NotFoundError("User Not Found");
    const updateData: any = {};

    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (tags) updateData.tags = Array.isArray(tags) ? tags : tags.split(",").map((t: string) => t.trim());
    if (category) updateData.category = category;

    const validBlog = await Blog.findById(blogId)
    if (!validBlog) throw new NotFoundError("blog not found");

    const updatedBlog = await Blog.findByIdAndUpdate(validBlog._id, updateData, { new: true });
    if (!updatedBlog) throw new NotFoundError("Blog not found");

    res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        data: updatedBlog
    });

    // after blog update to send request clodudinary to upload file
    if (req?.file) {
        const localFilePath = req?.file?.path as string;
        if (!localFilePath) throw new BadRequestError("Local File Path is required");
        try {
            const secure_url = await uploadOnCloudinary(localFilePath);
            if (!secure_url) {
                return res.status(500).json({
                    success: false,
                    message: "Secure Url is not received from Cloudinary!"
                })
            }
            validBlog.image = secure_url;
            await validBlog.save()
        } catch (error: any) {
            throw new ServerRespopnseError(error.message || "Internal Server Error!")
        }
    }
});

// delete Blog 
export const deleteBlog = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId: string = req?.user?._id;
    const { blogId } = req.params;

    if (!userId) throw new BadRequestError("UnAuthorized author is required");
    if (!blogId) throw new BadRequestError("Blog Is is Required");

    const user = await User.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    const blog = await Blog.findById(blogId);
    if (!blog) throw new NotFoundError("Blog not found!");

    if (userId.toString() !== blog.author.toString()) throw new UnauthorizedError("Only the author can delete this blog.");

    if (blog.image) {
        try {
            const publicId = getPublicId(blog.image);
            await cloudinary.uploader.destroy(publicId);
        } catch (error: any) {
            throw new ServerRespopnseError(error.message || "Internal Server Error")
        }
    }

    const deleteBlog = await Blog.findByIdAndDelete(blogId);
    if (!deleteBlog) throw new ServerRespopnseError();

    return res.status(200).json({
        message: "Blog deleted succesfull",
        success: true
    });
});


// get all blogs
export const getAllBlogs = asyncHandler(async (req: Request, res: Response) => {
    const blogs = await Blog.find().populate("author", "name email avatar _id");
    if (!blogs || blogs.length === 0) throw new NotFoundError("Blogs not found");
    
    return res.status(200).json({
        success: true,
        message: "Blogs Fetched Succesfull",
        data: blogs
    })
});

// Get Blog with slug
export const getBlogWithSlug = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    if (!slug) throw new BadRequestError("Slug is Required");

    const blog = await Blog.findOne({ slug: slug });
    if (!blog) throw new NotFoundError("Blog Not Found");

    return res.status(200).json({
        success: true,
        message: "Blog Fetched Succesfull",
        data: blog
    })
});

// Search Blog
export const getBlogWithSearch = asyncHandler(async (req: Request, res: Response) => {
    const { keyword } = req.query;
    if (!keyword) throw new BadRequestError("Keyword is required!")
    const blogs = await Blog.find({
        $or: [
            {
                title: {
                    $regex: keyword,
                    $options: "i"
                }
            },
            {
                category: {
                    $regex: keyword,
                    $options: "i"
                }
            }
        ]
    })

    if (!blogs || blogs.length === 0) throw new NotFoundError("Blog not found");

    return res.status(200).json({
        success: true,
        message: "Blog Fetched Succesfull",
        data: blogs
    })
});


// comment on blog user 
export const commentOnBlog = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {

    const { blogId } = req.params;
    const { text } = req.body;
    const userId = req?.user?._id;

    if (!blogId) throw new BadRequestError("Blog id is required");
    if (!userId) throw new BadRequestError("User id is required");
    if (!text) throw new BadRequestError("Textis required");

    const blog = await Blog.findById(blogId);
    if (!blog) throw new NotFoundError("Blog Not Found!");

    const user = await User.findById(userId)
    if (!user) throw new NotFoundError("User Not Found!");

    blog.comments.push({
        user: new mongoose.Types.ObjectId(userId),
        text,
        createdAt: new Date(),
    });

    await blog.save();

    return res.status(200).json({
        success: true,
        message: "Comment added successfully",
        data: blog,
    })
});

// delete comment
export const deleteComment = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { blogId, commentId } = req.params;
    const userId: string = req?.user?._id;

    if (!blogId || !commentId) throw new BadRequestError("Missing arguments!");

    const blog = await Blog.findById(blogId);
    if (!blog) throw new NotFoundError("Blog Not Found!");

    const user = await User.findById(userId);
    if (!user) throw new NotFoundError("User Not Found!");


    const comment = blog.comments.find((com: any) => com._id.toString() === commentId);
    if (!comment) throw new NotFoundError("Comment not found!");
    if (comment.user.toString() !== userId) {
        throw new UnauthorizedError(
            "You do not have access to delete this comment, only the comment author can delete it!"
        );
    };

    blog.comments = blog.comments.filter(
        (com: any) => com._id.toString() !== commentId
    );

    await blog.save();
    res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
    });
});

// like on blog 
export const likeOnBlog = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { blogId } = req.params;
    const userId: string = req?.user?._id;

    // Convert userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    if (!blogId) throw new BadRequestError("Blog id is required");
    if (!userId) throw new BadRequestError("User id is required");

    const blog = await Blog.findById(blogId);
    if (!blog) throw new NotFoundError("Blog Not Found!");

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError("User Not Found!");

    const alreadyLiked = blog.likes.some((id) => id.toString() === userId.toString());
    if (alreadyLiked) {
        blog.likes = blog.likes.filter((id) => id.toString() !== userId.toString());
    } else {
        blog.likes.push(userObjectId);
    }
    await blog.save();
    await blog.populate("likes", "name email");

    return res.status(200).json({
        success: true,
        message: alreadyLiked ? "Unlike Succesfull" : "Like Succesfull",
        data: blog.likes
    })
});

// like on comment 
export const likeOnComment = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { blogId, commentId } = req.params;
    if (!blogId || !commentId) throw new BadRequestError("Arguments Missing Id's");

    const userId = req?.user?._id;
    if (!userId) throw new BadRequestError("User Id Required");

    const blog = await Blog.findById(blogId);
    if (!blog) throw new NotFoundError("Blog Not Found!");

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError("User Not Found!");

    const comment: any = blog.comments.find((com: any) => com._id.toString() === commentId.toString());
    if (!comment) throw new NotFoundError("Comment Not Found");

    const alreadyLiked = comment.likes.some((like: any) => like.toString() === userId.toString());
    if (alreadyLiked) {
        // Unlike (remove userId from likes)
        comment.likes = comment.likes.filter((like: any) => like.toString() !== userId.toString())
    } else {
        comment.likes.push(userId)
    }

    return res.status(200).json({
        success: true,
        message: alreadyLiked ? "Unlike Succesfull" : "Like Succesfull"
    })
});

export const latestSixBlogs = asyncHandler(async(req: Request , res: Response) => {
    const blogs = await Blog.find().sort({createdAt: -1}).limit(6).populate("author", "name email avatar");
    if(!blogs || blogs.length === 0) throw new NotFoundError("Blogs Not Found");

    return res.status(200).json({
        success: true,
        message: "Blogs Fetch Succesfull",
        data: blogs
    })
});


// user blogs
export const userBlogs = asyncHandler(async (req: AuthenticatedRequest , res: Response) => {
    const userId = req.user._id;
    
})