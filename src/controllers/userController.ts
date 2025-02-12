import { Request, Response } from "express";
import { comparePassword, generateToken, hashPassword } from "../lib/jwtConfig";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const register = async (req: Request, res: Response) => {
    const { name, password, email } = req.body;
    const hashedPassword = await hashPassword(password);
    try {
        const user = await prisma.user.create({
            data: { name, password: hashedPassword, email },
        });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(400).json({ error: "Username already exists" });
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
        res.status(401).json({ error: "Invalid password" });
        return
    }
    const token = generateToken(user.id, user.role);
    res.json({ message: "Login successful", token });
};

export { register, login };