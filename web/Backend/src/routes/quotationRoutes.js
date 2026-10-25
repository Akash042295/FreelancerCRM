import express from "express";
import { createQuotation, getQuotationByDeal } from "../controllers/quotation.controller.js";
const router = express.Router();

router.post("/", createQuotation);
router.get("/deal/:dealId", getQuotationByDeal);

export default router;