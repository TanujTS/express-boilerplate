import type { AuthRequest } from "@repo/types";
import { ApiError } from "@repo/utils/api-error";
import type { NextFunction, Response } from "express";


export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req?.user;
    if (!user) {
        throw new ApiError(401, "Not authenticated");
    }
    if (user.role !== 'admin') {
        throw new ApiError(403, 'Unauthorized')
    }
    return next();
}