import express from 'express';
import http from 'http';
import logger from './lib/loggerConfig';
import { logReqRes } from './middlewares/logger';
import { gadgetsRouter } from './routes/gadgets';
import userRouter from './routes/user';

const app = express();
const server = http.createServer(app);

app.use(logReqRes());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/gadgets", gadgetsRouter);

app.get("/", (req, res) => {
    res.send("Hello Agent");
});

logger.info("Connecting To Server....");
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Development server running on http://localhost:${PORT}`);
});
