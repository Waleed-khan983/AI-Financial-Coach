import express from "express";
import {
    createTransaction,
    getALLTransactions,
    getTransactionById,

} from "../controllers/transactionController.js";
import { authMiddleware } from "../middlewars/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createTransaction);
router.get("/all", authMiddleware, getALLTransactions);
router.get("/:id", authMiddleware, getTransactionById);

export default router;