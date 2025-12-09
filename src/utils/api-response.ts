import type { Response } from "express";
import type { ApiResponseData, AuthRequest, Meta } from "../types";

// 2xx helpers
export const responseOk = <T>(req: AuthRequest, res: Response, data: T, message = "OK", meta?: Meta) => {
  const statusCode = 200;
  req?.log?.info({
    statusCode,
    dataCount: Array.isArray(data) ? data.length : undefined,
    ...(meta && { meta })
  }, message)

  return res.status(200).json({ status: "success", message, data, meta } satisfies ApiResponseData<T>);

}

export const responseCreated = <T>(req: AuthRequest, res: Response, data: T, message = "Created", meta?: Meta) => {
  req?.log?.info({
    statusCode: 200,
    resource: typeof data === "object" && data !== null ? (data as any).id : undefined,
    ...(meta && { meta }),
  }, message)
  return res.status(201).json({ status: "success", message, data, meta } satisfies ApiResponseData<T>);
}

// error helper
export const responseFail = (
  req: AuthRequest,
  res: Response,
  code: number,
  message: string,
  details?: unknown,
  meta?: Meta,
  stack?: string
) => {

  req?.log?.error(
    {
      statusCode: code,
      details,
      ...(stack && {stack}),
      ...(meta && {meta}),
    },
    `${message} - Error Response`
  )

  res.status(code).json({
    status: "error",
    message,
    error: { message, code: code, details, ...(stack ? { stack } : {}) },
    meta,
  } satisfies ApiResponseData<never>);

}