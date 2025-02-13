// filepath: /d:/web-dev/apps/node-full-stack/test/IMF-API/src/services/gadgetsService.ts
import { PrismaClient } from "@prisma/client";
import { Gadget } from "../types/models";

const prisma = new PrismaClient();

export const getAllGadgets = async (userId: string): Promise<Gadget[]> => {
    return await prisma.gadget.findMany({ where: { userId } });
};

export const getGadgetById = async (id: string, userId: string): Promise<Gadget | null> => {
    return await prisma.gadget.findUnique({ where: { id, userId } });
};

export const createGadget = async (data: Omit<Gadget, 'id'>): Promise<Gadget> => {
    return await prisma.gadget.create({ data });
};

export const updateGadget = async (id: string, data: Partial<Omit<Gadget, 'id'>>): Promise<Gadget> => {
    return await prisma.gadget.update({ where: { id }, data });
};

export const deleteGadget = async (id: string): Promise<Gadget> => {
    return await prisma.gadget.delete({ where: { id } });
};