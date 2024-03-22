import {Expense, IExpense} from '../models/expenses/expense';
import {IUserGroup} from "../models/users/usergroup";
import {Category} from "../models/categories/category";

export class ExpenseService {
    createExpense(userGroup: IUserGroup, amount: number, description: string, recurrence: string, categoryName: string, date: Date): Promise<IExpense> {
        return new Promise(async (resolve, reject) => {
            try {
                const category = await Category.findOne({ name: categoryName})
                if (!category) reject({status: 500, message: "Unknown category name"})

                const expense = await Expense.create({ userGroup, amount, description, recurrence, category, date});
                resolve(expense);
            } catch (error) {
                reject({ status: 500, message: 'Failed to create expense.' });
            }
        });
    }

    updateExpense(expenseId: string, update: Partial<IExpense>): Promise<IExpense | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedExpense = await Expense.findByIdAndUpdate(expenseId, update, { new: true }).populate("category");
                resolve(updatedExpense);
            } catch (error) {
                reject({ status: 500, message: 'Failed to update expense.' });
            }
        });
    }

    deleteExpense(expenseId: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await Expense.findByIdAndDelete(expenseId).populate("category");
                resolve();
            } catch (error) {
                reject({ status: 500, message: 'Failed to delete expense.' });
            }
        });
    }

    getExpenseById(expenseId: string): Promise<IExpense | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const expense = await Expense.findById(expenseId).populate("category");
                resolve(expense);
            } catch (error) {
                reject({ status: 404, message: 'Expense not found.' });
            }
        });
    }

    getExpensesByCategory(categoryId: string): Promise<IExpense[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const expenses = await Expense.find({ category: categoryId }).populate("category");
                resolve(expenses);
            } catch (error) {
                reject({ status: 404, message: 'Expenses not found.' });
            }
        });
    }

    getExpensesByDateRange(startDate: Date, endDate: Date): Promise<IExpense[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const expenses = await Expense.find({ date: { $gte: startDate, $lte: endDate } }).populate("category");
                resolve(expenses);
            } catch (error) {
                reject({ status: 404, message: 'Expenses not found.' });
            }
        });
    }

    getAllExpenses(): Promise<IExpense[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const expenses = await Expense.find().populate("category");
                resolve(expenses);
            } catch (error) {
                reject({ status: 404, message: 'Expenses not found.' });
            }
        });
    }
}

