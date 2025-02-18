import express from 'express';
import {
    createNewGadget,
    deleteExistingGadget,
    getGadget,
    getGadgets,
    selfDestructGadget,
    updateExistingGadget
} from '../controllers/gadgetsController';

const gadgetsRouter = express.Router();

gadgetsRouter.get('/', getGadgets);
gadgetsRouter.post('/', createNewGadget);
gadgetsRouter.get('/:id', getGadget);
gadgetsRouter.patch('/:id', updateExistingGadget);
gadgetsRouter.delete('/:id', deleteExistingGadget);
gadgetsRouter.post('/:id/self-destruct', selfDestructGadget);

export { gadgetsRouter };

