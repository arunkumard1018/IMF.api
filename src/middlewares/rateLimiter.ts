import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
    points: 10, // 10 requests
    duration: 1, // per 1 second by IP
});

export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const clientIp = req.socket.remoteAddress || '';
    rateLimiter.consume(clientIp)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).json({ message: 'Too many requests' });
        });
};