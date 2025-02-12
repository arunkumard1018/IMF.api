import dotenv from 'dotenv';
import winston from 'winston';
dotenv.config();

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});


const transports: winston.transport[] = [];


// Error log file for errors
transports.push(
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: winston.format.combine(
            winston.format.timestamp(),
            logFormat
        ),
    })
);

// Console transport for development
transports.push(
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
            winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
            logFormat
        ),
    })
);

// Create the Winston logger
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        logFormat
    ),
    transports,
});

export default logger;
