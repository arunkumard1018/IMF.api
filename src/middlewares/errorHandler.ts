import { Request, Response, NextFunction } from 'express';
import logger from '../lib/loggerConfig';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`Error: ${err.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
};