import express from "express";
import { createEnquiry, getAllEnquires } from "../controllers/enquiries.controller.js";

const router = express.Router();

router.post('/', createEnquiry);
router.get('/', getAllEnquires);

export default router;