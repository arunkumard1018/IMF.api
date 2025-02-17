import * as express from 'express';

interface authContext {
    userId:string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            authContext: authContext;
        }
    }
}
export type Id = mongoose.Schema.Types.ObjectId;