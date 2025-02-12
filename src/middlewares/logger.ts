import { NextFunction, Request, Response } from "express";
import logger from "../lib/loggerConfig";
import { colorWord } from "../utils";


/**
 * Middle WAre to Log Reqested User Info
 * @param filename for Logging 
 * @returns next() after Logging the Req
 */
const logReqRes = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const clientIp = req.socket.remoteAddress;
        const fullUrl = `${req.originalUrl} IP:${clientIp}`;
        logger.info(`[${colorWord(req.method, "214")}] Request received from ${req.headers["sec-ch-ua-platform"]}, ${req.headers["host"]}${fullUrl}`);
        next();
    }
}

export { logReqRes };