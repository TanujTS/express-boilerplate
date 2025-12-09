import fs from 'fs';
import path from 'path';
import pino from 'pino';
import type { LoggerConfig } from './config';

/**
 * 
 * @param logsDir 
 * Creates log directory if it doesn't exist
 */
export function ensureLogsDirectory(logsDir: string): void {
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true});
    }
}

/**
 * get appropriate transports(where to log) based on environment 
 */
export function getTransports(config: LoggerConfig) {
    const { isDevelopment, isProduction, logsDirectory } = config;

    ensureLogsDirectory(logsDirectory);

    if (isDevelopment) {
        return pino.transport({
            targets: [
                // console output - pretty formatted
                {
                    level: 'debug',
                    target: 'pino-pretty',
                    options:  {
                        colorize: true,
                        translateTime: 'SYS:standard',
                        ignore: 'pid, hostname',
                        messageFormat: '{levelLabel} - {msg}',
                        singleLine: false,
                        messageKey: 'msg'
                    }
                },
                //all logs to file
                {
                    level: 'debug',
                    target: 'pino-rolling-file',
                    options: {
                        file: path.join(logsDirectory, 'app.log'),
                        maxSize: '10M',
                        maxFiles: 5
                    }
                }
                //errors to separate files
                {
                    level: 'error',
                    target: 'pino-rolling-file',
                    options: {
                        file: path.join(logsDirectory, 'error.log'),
                        maxSize: '10M',
                        maxFiles: 5
                    }
                }
            ]
        })
    }
}