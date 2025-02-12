// filepath: /d:/web-dev/apps/node-full-stack/test/IMF-API/src/controllers/gadgetsController.ts
import { Request, Response } from "express";
import { getAllGadgets, getGadgetById, createGadget, updateGadget, deleteGadget } from "../services/gadgetsService";

export const getGadgets = async (req: Request, res: Response) => {
    try {
        const gadgets = await getAllGadgets();
        res.json(gadgets);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch gadgets" });
    }
};

export const getGadget = async (req: Request, res: Response) => {
    try {
        const gadget = await getGadgetById(req.params.id);
        if (!gadget) {
            res.status(404).json({ error: "Gadget not found" });
            return;
        }
        res.json(gadget);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch gadget" });
    }
};

export const createNewGadget = async (req: Request, res: Response) => {
    try {
        const gadget = await createGadget(req.body);
        res.status(201).json(gadget);
    } catch (error) {
        res.status(500).json({ error: "Failed to create gadget" });
    }
};

export const updateExistingGadget = async (req: Request, res: Response) => {
    try {
        const gadget = await updateGadget(req.params.id, req.body);
        res.json(gadget);
    } catch (error) {
        res.status(500).json({ error: "Failed to update gadget" });
    }
};

export const deleteExistingGadget = async (req: Request, res: Response) => {
    try {
        await deleteGadget(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete gadget" });
    }
};