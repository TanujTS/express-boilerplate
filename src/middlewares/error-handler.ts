import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error";
import { responseFail } from "../utils/api-response";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    return responseFail(
      res,
      err.code,
      err.message,
      err.errors,
      undefined,
      process.env.NODE_ENV === "development" ? err.stack : undefined
    );
  }
  console.error(err);
  return responseFail(res, 500, "Internal server error");
}