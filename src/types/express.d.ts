import * as express from 'express';

interface authContext {
    userId: mongoose.Schema.Types.ObjectId;
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