import type { Request } from "express";
export type Status = "success" | "error" | "pending";
export type Meta = { pagination?: unknown; requestId?: string; [k: string]: unknown };

export interface ApiResponseData<T> {
    status: Status,
    message?: string;
    data?: T;
    error?: {
        message: string;
        code: number;
        details?: unknown
        stack?: string;
    }
    meta?: Meta;
}

export interface AuthRequest extends Request {
    session?: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        ipAddress?: string | null | undefined;
        userAgent?: string | null | undefined;
    };
    user?: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
    };
}