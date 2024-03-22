import express from 'express';
import {
    createExpense,
    deleteExpense,
    getAllExpenses,
    getExpenseById,
    getExpensesByCategory,
    getExpensesByDateRange,
    updateExpense
} from "../controllers/expense.controller";
import {isAdmin, isUserGroup, protect} from "../middlewares/auth";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
} from "../controllers/category.controller";
export const categoryRouter = express.Router();

// Routes for expenses
categoryRouter.route('/').get([protect, isUserGroup], getAllCategories).post([protect, isUserGroup], createCategory);
categoryRouter.route('/:id').get([protect, isUserGroup], getCategoryById).put([protect, isUserGroup], updateCategory).delete([protect, isUserGroup], deleteCategory);
