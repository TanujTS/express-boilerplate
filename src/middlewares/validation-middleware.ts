import type { ZodSchema } from 'zod';
import type { AuthRequest } from '@repo/types';
import type { NextFunction, Response } from 'express';
import { ApiError } from '@repo/utils/api-error';

export type ValidateLocation = 'body' | 'query' | 'params';

export const validate = (schema: ZodSchema, location: ValidateLocation = 'body') => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = location === 'body' ? req.body : location === 'query' ? req.query : req.params;
      const validated = schema.parse(data);
      
      if (location === 'body') req.body = validated;
      if (location === 'query') req.query = validated;
      if (location === 'params') req.params = validated;
      
      next();
    } catch (error: any) {
      const formattedErrors = error.errors?.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message,
      })) || [];

      throw new ApiError(400, 'Validation failed', formattedErrors);
    }
  };
};