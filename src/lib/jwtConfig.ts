import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = 'your-secret-key';
const SALT_ROUNDS = 10;

export const generateToken = (userId: string, role: string, email: string): string => {
    return jwt.sign({ userId, role, email }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string): { userId: string; role: string } => {
    return jwt.verify(token, SECRET_KEY) as { userId: string; role: string };
};

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};
