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

    getExpensesByCategory(categoryId: string, page: number, limit: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const options = { page, limit, populate: {path: 'category'}}
                await Expense.paginate({ category: categoryId }, options, function (err, result) {
                    if (err) reject({status: 404, message: 'Expenses not found.'});
                    else resolve(result)
                })
            } catch (error) {
                reject({ status: 404, message: 'Expenses not found.' });
            }
        });
    }

    getExpensesByDateRange(startDate: Date, endDate: Date, page: number, limit: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const options = { page, limit, populate: {path: 'category'}}
                await Expense.paginate({ date: { $gte: startDate, $lte: endDate } }, options, function (err, result) {
                    if (err) reject({status: 404, message: 'Expenses not found.'});
                    else resolve(result)
                })
            } catch (error) {
                reject({ status: 404, message: 'Expenses not found.' });
            }
        });
    }

    getAllExpenses(page: number, limit: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const options = { page, limit, populate: {path: 'category'}}
                await Expense.paginate({}, options, function (err, result) {
                    if (err) reject({status: 404, message: 'Expenses not found.'});
                    else resolve(result)
                })
            } catch (error) {
                reject({ status: 404, message: 'Expenses not found.' });
            }
        });
    }
}

