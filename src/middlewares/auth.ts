import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/jwtConfig';
import logger from '../lib/loggerConfig';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        logger.warn('Access denied. No token provided.');
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }
    try {
        const decoded = verifyToken(token);
        req.authContext = { userId: decoded.userId, role: decoded.role };
        logger.info(`Token verified for userId: ${decoded.userId}`);
        next();
    } catch (error) {
        const message = (error as Error).message;
        logger.error(message);
        res.status(400).json({ message: message });
        return;
    }
};