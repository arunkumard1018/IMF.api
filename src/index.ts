import express from 'express';
import logger from './lib/loggerConfig';
import { logReqRes } from './middlewares/logger';
import userRouter from './routes/authRoute';
import { gadgetsRouter } from './routes/gadgetsRoute';

const app = express();

app.use(logReqRes());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/gadgets", gadgetsRouter);

app.get("/", (req, res) => {
    res.send("Hello Agent");
});



logger.info("Connecting To Server....");
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Development server running on http://localhost:${PORT}`);
});
