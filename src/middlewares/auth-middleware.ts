import { auth } from "@repo/lib/auth";
import type { AuthRequest } from "@repo/types";
import { ApiError } from "@repo/utils/api-error";
import { fromNodeHeaders } from "better-auth/node";
import type { NextFunction, Request, Response } from "express";


export async function requireAuth(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        })
        if (!session) {
            throw new ApiError(401, "Unauthorized!");
        }
        req.session = session.session;
        req.user = session.user;
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized")
    }
}