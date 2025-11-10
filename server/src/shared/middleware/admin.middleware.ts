import type { Response, NextFunction } from "express";
import { asyncHandler } from "src/common/utils/asyncHandler";
import { UnauthorizedError } from "src/config/error/customError.config";
import { AuthenticatedRequest } from "src/types/express";
import { ROLE } from "src/user/user.schema";

export const isAdmin = asyncHandler(async (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    try {
        const role = req.user.role;
        if (role !== "admin") throw new UnauthorizedError("You have not access only admin can access this route..!");
        next();
    } catch (error) {
        console.log(error)
    }
})