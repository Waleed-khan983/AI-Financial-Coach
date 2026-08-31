import express from "express";

import {
    createBudget,
    getAllBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget,
} from "../controllers/budgetController.js";

import {authMiddleware} from "../middlewares/authMiddleware.js";




const router = express.Router();


router.post("/create", authMiddleware, createBudget);
router.get("/all", authMiddleware, getAllBudgets);
router.get("/:id", authMiddleware, getBudgetById);
router.put("/:id", authMiddleware, updateBudget);
router.delete("/:id", authMiddleware, deleteBudget);

export default router;