import express from 'express';
import logger from './lib/loggerConfig';
import { logReqRes } from './middlewares/logger';
import userRouter from './routes/authRoute';
import { gadgetsRouter } from './routes/gadgetsRoute';
import { authMiddleware } from './middlewares/auth';
import { homeRoute } from './routes/homeRoute';
import { errorHandler } from './middlewares/errorHandler';
import { rateLimiterMiddleware } from './middlewares/rateLimiter';

const app = express();

app.use(rateLimiterMiddleware);
app.use(logReqRes());
app.use(express.json());

app.use("/", homeRoute);
app.use("/api/auth", userRouter);
app.use("/api/gadgets", authMiddleware, gadgetsRouter);

app.use(errorHandler);

logger.info("Connecting To Server....");
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
