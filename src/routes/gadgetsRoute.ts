import express from 'express';
import {
    createNewGadget,
    deleteExistingGadget,
    getGadget,
    getGadgets,
    updateExistingGadget
} from '../controllers/gadgetsController';

const gadgetsRouter = express.Router();

gadgetsRouter.get('/', getGadgets);
gadgetsRouter.post('/', createNewGadget);
gadgetsRouter.get('/:id', getGadget);
gadgetsRouter.put('/:id', updateExistingGadget);
gadgetsRouter.delete('/:id', deleteExistingGadget);

export { gadgetsRouter };
