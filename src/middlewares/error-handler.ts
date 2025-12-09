import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error";
import { responseFail } from "../utils/api-response";
import { logger } from "@repo/logger"

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {

    //log api error
    req.log?.error(
      {
        statusCode: err.code,
        message: err.message,
        errors: err.errors,
      },
      'API Error'
    )
    return responseFail(
      res,
      err.code,
      err.message,
      err.errors,
      undefined,
      process.env.NODE_ENV === "development" ? err.stack : undefined
    );
  }

  //log unexpected errors with base logger
  logger.error(err, 'Unexpected error');
  return responseFail(res, 500, "Internal server error");
}