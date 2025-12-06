import type { Response } from "express";
import type { ApiResponseData, Meta } from "../types";


// 2xx helpers
export const responseOk = <T>(res: Response, data: T, message = "OK", meta?: Meta) =>
  res.status(200).json({ status: "success", message, data, meta } satisfies ApiResponseData<T>);

export const responseCreated = <T>(res: Response, data: T, message = "Created", meta?: Meta) =>
  res.status(201).json({ status: "success", message, data, meta } satisfies ApiResponseData<T>);

// error helper
export const responseFail = (
  res: Response,
  code: number,
  message: string,
  details?: unknown,
  meta?: Meta,
  stack?: string
) =>
  res.status(code).json({
    status: "error",
    message,
    error: { message, code: code, details, ...(stack ? { stack } : {}) },
    meta,
  } satisfies ApiResponseData<never>);