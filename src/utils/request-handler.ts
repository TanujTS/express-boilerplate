import type { AuthRequest } from "@repo/types";
import type { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncRequestHandler = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => Promise<void | Response>;

export const asyncHandler = (requestHandler: AsyncRequestHandler): RequestHandler => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};  