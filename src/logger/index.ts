import pinoHttp from "pino-http";
import { getLoggerConfig } from "./config";
import { getTransports } from "./transports";
import pino from 'pino'
import crypto from 'crypto' 
import type { AuthRequest } from "@repo/types";

const config = getLoggerConfig();
const transport = getTransports(config);

/**
 * Base Pino Logger Instance
 * Used for app level logging
 */
const baseLogger = pino(
    {
        level: config.logLevel,
    },
    transport
);

export const httpLogger = pinoHttp({
    logger: baseLogger,

    autoLogging:{
        ignore: (req) => req.url === '/health'
    },

    //generate unique request ids
    genReqId: (req, res) => {
        const existingId = req.id || req.headers['x-request-id'];
        if (existingId) return existingId;

        const id = crypto.randomUUID();
        res.setHeader('X-Request-ID', id);
        return id;
    },

    //log levels based on status code
    customLogLevel: (req, res, err) => {
        if (res.statusCode >= 400 && res.statusCode < 500) {
            return 'warn';
        }
        if (res.statusCode >= 500 || err) {
            return 'error';
        }
        if (res.statusCode >= 300 && res.statusCode < 400) {
            return 'silent';
        }
        return 'info';
    },

    //custom props for every http log
    customProps: (req, res) => {
        const authRequest = req as AuthRequest;
        return {
            userId: authRequest?.user?.id || 'anonymous',
            userEmail: authRequest?.user?.email,
            environment: config.environment 
        };
    },

    //custom success message
    customSuccessMessage: (req, res) => {
        return `${req.method} ${req.url} - ${res.statusCode}`
    },

    //custom error message
    customErrorMessage: (req, res, err) => {
        return `${req.method} ${req.url} - ${res.statusCode} - ${err.message}`
    },

    customAttributeKeys: {
        req: 'request',
        res: 'response',
        err: 'error',
        responseTime: 'duration'
    },

    //use standard serializers
    serializers: {
        req: (req) => ({
            method: req.method,
            url: req.url,
            id: (req as any).id,
        }),
        res: (res) => ({
            statusCode: res.statusCode,
        }),
        err: pino.stdSerializers.err,
    }

});

/**
 * Base Logger for app-level logging
 * Usage: logger.info('message;), logger.error(err, 'message') 
 */
export const logger = baseLogger

/**
 * Usage: app.use(httpLogger)
 */
export default httpLogger

