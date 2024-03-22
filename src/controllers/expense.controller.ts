import { Request, Response } from 'express';
import { ExpenseService } from '../services/expense.service';

const expenseService = new ExpenseService();

export const createExpense = async (req: Request, res: Response) => {
    const { amount, description, category, date, recurrence } = req.body;
    try {
        const expense = await expenseService.createExpense((req as any).userGroup, amount, description, recurrence, category, date);
        return res.status(201).json(expense);
    } catch (error: any) {
        return res.status(error.status || 500).json({ message: error.message });
    }
}

export const updateExpense = async (req: Request, res: Response) => {
    const { id } = req.params;
    const update = req.body;
    try {
        const updatedExpense = await expenseService.updateExpense(id, update);
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found.' });
        }
        return res.json(updatedExpense);
    } catch (error: any) {
        return res.status(error.status || 500).json({ message: error.message });
    }
}

export const deleteExpense = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await expenseService.deleteExpense(id);
        return res.status(204).end();
    } catch (error: any) {
        return res.status(error.status || 500).json({ message: error.message });
    }
}

export const getExpenseById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const expense = await expenseService.getExpenseById(id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found.' });
        }
        return res.json(expense);
    } catch (error: any) {
        return res.status(error.status || 500).json({ message: error.message });
    }
}

export const getExpensesByCategory = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    try {
        const expenses = await expenseService.getExpensesByCategory(categoryId);
        return res.json(expenses);
    } catch (error: any) {
        return res.status(error.status || 500).json({ message: error.message });
    }
}

export const getExpensesByDateRange = async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;
    try {
        const expenses = await expenseService.getExpensesByDateRange(new Date(startDate as string), new Date(endDate as string));
        return res.json(expenses);
    } catch (error: any) {
        return res.status(error.status || 500).json({ message: error.message });
    }
}

export const getAllExpenses = async (req: Request, res: Response) => {
    try {
        const expenses = await expenseService.getAllExpenses();
        return res.json(expenses);
    } catch (error: any) {
        return res.status(error.status || 500).json({ message: error.message });
    }
}

