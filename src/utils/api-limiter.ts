import type { AuthRequest } from "@repo/types";
import rateLimit from "express-rate-limit";
import { responseFail } from "./api-response";


export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, 
  legacyHeaders: false, 
  skip: (req) => req.url === '/health', 
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, 
  message: 'Too many login attempts, please try again later.',
  skipSuccessfulRequests: true, 
});

// API rate limiter - looser for general API usage
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30, 
  message: 'Too many API requests, please try again later.',
});