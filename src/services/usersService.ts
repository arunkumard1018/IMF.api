import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { User } from "../types/models";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export const getAllUsers = async (): Promise<User[]> => {
    return await prisma.user.findMany();
};

export const getUserById = async (id: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { id } });
};

export const createUser = async (data: Omit<User, 'id'>): Promise<User> => {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
    return await prisma.user.create({
        data: {
            ...data,
            password: hashedPassword
        }
    });
};

export const updateUser = async (id: string, data: Partial<Omit<User, 'id'>>): Promise<User> => {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    }
    return await prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: string): Promise<User> => {
    return await prisma.user.delete({ where: { id } });
};