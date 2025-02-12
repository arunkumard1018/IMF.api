import express from 'express';
import { login, register } from '../controllers/userController';
const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);

export default userRouter;