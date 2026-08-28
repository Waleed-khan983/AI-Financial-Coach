import express from "express";
import {
    createTransaction,
    getALLTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,

} from "../controllers/transactionController.js";
import { authMiddleware } from "../middlewars/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createTransaction);
router.get("/all", authMiddleware, getALLTransactions);
router.get("/:id", authMiddleware, getTransactionById);
router.put("/update/:id", authMiddleware, updateTransaction);
router.delete("/delete/:id", authMiddleware, deleteTransaction);

export default router;