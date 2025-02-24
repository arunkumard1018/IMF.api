import { Router, Request, Response } from 'express';
import os from 'os';
import packageJson from '../../package.json';
import { HttpStatusCode } from '../utils/statusCodes';
import { ResponseEntity } from '../types/ApiResponse';

const homeRoute = Router();

homeRoute.get('/', (req: Request, res: Response) => {
    const serverInfo = {
        appName: packageJson.name,
        appVersion: packageJson.version,
        nodeVersion: process.version,
        platform: os.platform(),
        architecture: os.arch(),
        uptime: os.uptime(),
    };

    res.status(HttpStatusCode.OK).json(ResponseEntity("success","IMF-API-INFO", serverInfo));
});

export {homeRoute};