// filepath: /d:/web-dev/apps/node-full-stack/test/IMF-API/src/services/gadgetsService.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllGadgets = async () => {
    return await prisma.gadget.findMany();
};

export const getGadgetById = async (id: string) => {
    return await prisma.gadget.findUnique({ where: { id } });
};

export const createGadget = async (data: any) => {
    return await prisma.gadget.create({ data });
};

export const updateGadget = async (id: string, data: any) => {
    return await prisma.gadget.update({ where: { id }, data });
};

export const deleteGadget = async (id: string) => {
    return await prisma.gadget.delete({ where: { id } });
};