import { Request, Response } from "express";
import { comparePassword, generateToken, hashPassword } from "../lib/jwtConfig";
import prisma from "../lib/prismaClient";
import logger from "../lib/loggerConfig";
import { ResponseEntity } from "../types/ApiResponse";
import { userSchema, loginSchema } from "../lib/validationSchemas";

const register = async (req: Request, res: Response) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        logger.error(`Validation failed for registering user: ${error.message}`);
        res.status(400).json(ResponseEntity("error", error.message));
        return;
    }

    const { name, password, email } = req.body;
    const hashedPassword = await hashPassword(password);
    try {
        const user = await prisma.user.create({
            data: { name, password: hashedPassword, email },
        });
        logger.info(`User registered successfully: ${email}`);
        const token = generateToken(user.id, user.role, user.email);
        res.status(201).json(ResponseEntity("success", "User registered successfully", { id: user.id, name: user.name, email: user.email, token: token }));
    } catch (error) {
        logger.error(`Registration failed for email: ${email} - ${(error as Error).message}`);
        res.status(400).json(ResponseEntity("error", "Username already exists", undefined, error));
    }
};

const login = async (req: Request, res: Response) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        logger.error(`Validation failed for login: ${error.message}`);
        res.status(400).json(ResponseEntity("error", error.message));
        return;
    }

    const { email, password } = req.body;

    logger.info(`Login attempt for email: ${email}`);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        logger.warn(`User not found for email: ${email}`);
        res.status(404).json(ResponseEntity("error", "User not found"));
        return;
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
        logger.warn(`Invalid password for email: ${email}`);
        res.status(401).json(ResponseEntity("error", "Invalid password"));
        return;
    }

    const token = generateToken(user.id, user.role, user.email);
    logger.info(`Login successful for email: ${email}`);
    res.status(200).json(ResponseEntity("success", "Login successful", { token }));
};

export { register, login };