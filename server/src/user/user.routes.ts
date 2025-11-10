import { Router } from "express";
import { isAuthenticated } from "../shared/middleware/auth.middleware";
import { getCurrentUser, updateUserProfile } from "./user.controller"
import upload from "src/shared/middleware/multer.middleware";

const userRouter = Router();

userRouter.get("/current-user", isAuthenticated, getCurrentUser)
userRouter.post("/update-userProfile", isAuthenticated, upload.single("avatar"), updateUserProfile);

export default userRouter