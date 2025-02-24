import { Gadget } from "@prisma/client";
import { Request, Response } from "express";
import logger from "../lib/loggerConfig";
import { createGadget, getAllGadgets, getGadgetById, updateGadget } from "../services/gadgetsService";
import { ResponseEntity } from "../types/ApiResponse";
import { generateMissionSuccessProbability } from "../utils";
import { generateConfirmationCode, generateUniqueCodename } from "../utils/codeNameGenerator";
import { HttpStatusCode } from "../utils/statusCodes";
import { gadgetSchema } from "../lib/validationSchemas";

export const getGadgets = async (req: Request, res: Response) => {
    try {
        const userId = req.authContext?.userId;
        const status = req.query.status as string;
        logger.info(`Fetching gadgets for user ${userId} with status ${status}`);
        const gadgets = await getAllGadgets(userId, status);
        const gadgetsWithProbability = gadgets.map(gadget => ({
            id: gadget.id,
            name: gadget.name,
            codename: gadget.codename,
            status: gadget.status,
            decommissionedAt: gadget.decommissionedAt,
            missionSuccessProbability: generateMissionSuccessProbability()
        }));
        logger.debug(`Fetched gadgets: ${JSON.stringify(gadgetsWithProbability)}`);
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Gadgets fetched successfully", gadgetsWithProbability));
    } catch (error) {
        logger.error(`Failed to fetch gadgets for user ${req.authContext?.userId}: ${(error as Error).message}`);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Failed to fetch gadgets", undefined, error));
    }
};

export const getGadget = async (req: Request, res: Response) => {
    try {
        const userId = req.authContext.userId;
        const gadget = await getGadgetById(req.params.id, userId);
        if (!gadget) {
            logger.warn(`Gadget not found for user ${userId} with id ${req.params.id}`);
            res.status(HttpStatusCode.NOT_FOUND).json(ResponseEntity("error", "Gadget not found"));
            return;
        }
        logger.debug(`Fetched gadget: ${JSON.stringify(gadget)}`);
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Gadget fetched successfully", { ...gadget, missionSuccessProbability: generateMissionSuccessProbability() }));
    } catch (error) {
        logger.error(`Failed to fetch gadget for user ${req.authContext?.userId} with id ${req.params.id}: ${(error as Error).message}`);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Failed to fetch gadget", undefined, error));
    }
};

export const createNewGadget = async (req: Request, res: Response) => {
    const { error } = gadgetSchema.validate(req.body);
    const userId = req.authContext.userId;
    if (error) {
        logger.error(`Validation failed for creating gadget: ${error.message}`);
        res.status(HttpStatusCode.BAD_REQUEST).json(ResponseEntity("error", error.message));
        return;
    }

    try {
        const codename = await generateUniqueCodename(userId);
        const gadgetData: Omit<Gadget, 'id'> = { ...req.body, codename, userId: userId };
        const gadget = await createGadget(gadgetData);
        logger.info(`Gadget created successfully for user ${userId} with id ${gadget.id}`);
        res.status(HttpStatusCode.CREATED).json(ResponseEntity("success", "Gadget created successfully", gadget));
    } catch (error) {
        logger.error(`Failed to create gadget for user ${userId}: ${(error as Error).message}`);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Failed to create gadget", undefined, error));
    }
};

export const updateExistingGadget = async (req: Request, res: Response) => {
    const { error } = gadgetSchema.validate(req.body);
    const gadgetId = req.params.id;
    if (error) {
        logger.error(`Validation failed for updating gadget: ${error.message}`);
        res.status(HttpStatusCode.BAD_REQUEST).json(ResponseEntity("error", error.name, undefined, error.message));
        return;
    }

    try {
        const userId = req.authContext.userId;
        const gadget: Gadget | null = await getGadgetById(gadgetId, userId);
        if (!gadget) {
            logger.warn(`Gadget not found for user ${userId} with id ${gadgetId}`);
            res.status(HttpStatusCode.NOT_FOUND).json(ResponseEntity("error", "Gadget not found"));
            return;
        }
        gadget.name = req.body.name;
        gadget.status = req.body.status;
        gadget.updatedAt = new Date();
        const updatedGadget = await updateGadget(userId, gadgetId, gadget);
        logger.info(`Gadget updated successfully for user ${userId} with id ${gadgetId}`);
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Gadget updated successfully", updatedGadget));
    } catch (error) {
        logger.error(`Failed to update gadget for user ${req.authContext?.userId} with id ${req.params.id}: ${(error as Error).message}`);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Failed to update gadget", undefined, error));
    }
};

export const deleteExistingGadget = async (req: Request, res: Response) => {
    try {
        const userId = req.authContext.userId;
        const gadget = await getGadgetById(req.params.id, userId);
        if (!gadget) {
            logger.warn(`Gadget not found for user ${userId} with id ${req.params.id}`);
            res.status(HttpStatusCode.NOT_FOUND).json(ResponseEntity("error", "Gadget not found"));
            return;
        }

        const updatedGadget = await updateGadget(userId, req.params.id, {
            ...gadget,
            status: "Decommissioned",
            decommissionedAt: new Date(),
        });

        logger.info(`Gadget decommissioned successfully for user ${userId} with id ${req.params.id}`);
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", "Gadget decommissioned successfully", updatedGadget));
    } catch (error) {
        logger.error(`Failed to decommission gadget for user ${req.authContext?.userId} with id ${req.params.id}: ${(error as Error).message}`);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Failed to decommission gadget", undefined, error));
    }
};

export const selfDestructGadget = async (req: Request, res: Response) => {
    try {
        const userId = req.authContext.userId;
        const gadgetId = req.params.id;
        const gadget = await getGadgetById(gadgetId, userId);
        if (!gadget) {
            logger.warn(`Gadget not found for user ${userId} with id ${gadgetId}`);
            res.status(HttpStatusCode.NOT_FOUND).json(ResponseEntity("error", "Gadget not found"));
            return;
        }

        const confirmationCode = generateConfirmationCode();
        const updatedGadget = await updateGadget(userId, gadgetId, {
            ...gadget,
            status: "Decommissioned",
            decommissionedAt: new Date(),
        });

        logger.info(`Gadget decommissioned successfully for user ${userId} with id ${gadgetId}. Confirmation code: ${confirmationCode}`);
        res.status(HttpStatusCode.OK).json(ResponseEntity("success", `Gadget decommissioned successfully. Confirmation code: ${confirmationCode}`, updatedGadget));
    } catch (error) {
        logger.error(`Failed to decommission gadget for user ${req.authContext?.userId} with id ${req.params.id}: ${(error as Error).message}`);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(ResponseEntity("error", "Failed to decommission gadget", undefined, error));
    }
};



