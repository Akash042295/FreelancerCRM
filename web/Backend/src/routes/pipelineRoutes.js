import express from "express";
// import {authMiddleware} from "../middleware/authMiddleware.js";
import { getStages, getPipeline, createDeal, updateDeal, moveDeal, archiveDeal } from "../controllers/pipeline.controller.js";

const router = express.Router();
// This assumes authMiddleware is a default export and sets req.user.
// router.use(authMiddleware);
router.get("/stages", getStages);
router.get("/", getPipeline);
router.post("/deals", createDeal);
router.patch("/deals/:dealId", updateDeal);
router.patch("/deals/:dealId/move", moveDeal);
router.delete("/deals/:dealId", archiveDeal);
export default router;
