import { Router } from "express";
import { deleteBlog, deleteUser, getAllUsers, updateUserRole } from "./admin.controller";
import { isAdmin } from "src/shared/middleware/admin.middleware";
import { isAuthenticated } from "src/shared/middleware/auth.middleware";

const adminRouter = Router();

adminRouter.get("/users", isAuthenticated, isAdmin, getAllUsers);
adminRouter.delete("/delete/user", isAuthenticated, isAdmin, deleteUser);
adminRouter.put("/updateRole", isAuthenticated, isAdmin, updateUserRole);
adminRouter.delete("/deleteBlog", isAuthenticated, isAdmin, deleteBlog);

export default adminRouter