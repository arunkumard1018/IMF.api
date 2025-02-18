import { PrismaClient } from "@prisma/client";
import { Gadget } from "../types/models";
const prisma = new PrismaClient();

export const getAllGadgets = async (userId: string, status?: string): Promise<Gadget[]> => {
    const whereClause: any = { userId };
    if (status) {
        whereClause.status = status;
    }
    return await prisma.gadget.findMany({ where: whereClause });
};

export const getGadgetById = async (id: string, userId: string): Promise<Gadget | null> => {
    return await prisma.gadget.findUnique({ where: { id, userId } });
};

export const createGadget = async (data: Omit<Gadget, 'id'>): Promise<Gadget> => {
    return await prisma.gadget.create({ data });
};

export const updateGadget = async (userId: string, id: string, data: Gadget): Promise<Gadget> => {
    return await prisma.gadget.update({ where: { id, userId }, data });
};

export const deleteGadget = async (id: string): Promise<Gadget> => {
    return await prisma.gadget.delete({ where: { id } });
};
