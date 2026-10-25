import Router from "express";

import {getDealById, updateDeal, getDealActivities, addDealActivity} from '../controllers/deal.controller.js';

const router = Router();

router.get('/:id', getDealById);
router.patch('/:id', updateDeal);
router.put('/:id', updateDeal);
router.get('/:id/activities', getDealActivities);
router.post('/:id/activities', addDealActivity);

export default router;