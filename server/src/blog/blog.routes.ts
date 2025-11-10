import { Router } from "express";
import { commentOnBlog, createBlog, deleteBlog, deleteComment, getAllBlogs, getBlogWithSearch, getBlogWithSlug, latestSixBlogs, likeOnBlog, likeOnComment, updateBlog } from "./blog.controller";
import { isAuthenticated } from "../shared/middleware/auth.middleware"
import upload from "../shared/middleware/multer.middleware"
const blogRouter = Router();

blogRouter.get("/getAllBlogs", getAllBlogs);
blogRouter.get("/latestSixBlogs", latestSixBlogs);
blogRouter.post("/create", isAuthenticated, upload.single("image"), createBlog);
blogRouter.put("/update/:blogId", isAuthenticated, updateBlog);
blogRouter.delete("/delete/:blogId", isAuthenticated, deleteBlog);
blogRouter.get("/getBlog/:slug", getBlogWithSlug);
blogRouter.get("/search", getBlogWithSearch);
blogRouter.post("/com/:blogId", isAuthenticated, commentOnBlog);
blogRouter.delete("/com/:blogId/:commentId", isAuthenticated, deleteComment)
blogRouter.post("/like/:blogId", isAuthenticated, likeOnBlog)
blogRouter.put("/comment/blog/:blogId/comment/:commentId", isAuthenticated, likeOnComment);

export default blogRouter