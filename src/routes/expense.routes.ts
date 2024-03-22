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
export const expenseRouter = express.Router();

// Routes for expenses
expenseRouter.route('/').get([protect, isUserGroup], getAllExpenses).post([protect, isUserGroup], createExpense);
expenseRouter.route('/:id').get([protect, isUserGroup], getExpenseById).put([protect, isUserGroup], updateExpense).delete([protect, isUserGroup], deleteExpense);
expenseRouter.route('/category/:categoryId').get([protect, isUserGroup], getExpensesByCategory);
expenseRouter.route('/dateRange').get([protect, isUserGroup], getExpensesByDateRange);
