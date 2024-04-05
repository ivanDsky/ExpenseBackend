import {Expense, IExpense} from '../models/expenses/expense';
import {IUserGroup} from "../models/users/usergroup";
import {Category} from "../models/categories/category";

export class ExpenseService {
    createExpense(userGroup: IUserGroup, amount: number, description: string, recurrence: string, categoryName: string, date: Date): Promise<IExpense> {
        return new Promise(async (resolve, reject) => {
            try {
                if (recurrence != "yearly" && recurrence != "monthly" && recurrence != "daily" && recurrence != "one-time") {
                    reject({ status: 403, message: "Incorrect recurrence type"})
                    return
                }

                const category = await Category.findOne({ name: categoryName})
                if (!category) reject({status: 500, message: "Unknown category name"})

                const expense = await this.createOneTimeExpense(userGroup, amount, description, recurrence, category, date)
                if (recurrence != "one-time") await this.createRecurrentExpense(expense, userGroup, amount, description, recurrence, category, date)
                resolve(expense);
            } catch (error) {
                reject({ status: 500, message: 'Failed to create expense.' });
            }
        });
    }

    private createOneTimeExpense(userGroup: IUserGroup, amount: number, description: string, recurrence: string, category: any, date: Date): Promise<IExpense> {
        return new Promise(async (resolve, reject) => {
            try {
                const expense = await Expense.create({ userGroup, amount, description, recurrence, category, date});
                resolve(expense);
            } catch (error) {
                reject({ status: 500, message: 'Failed to create expense.' });
            }
        });
    }

    private createRecurrentExpense(baseExpense: IExpense, userGroup: IUserGroup, amount: number, description: string, recurrence: string, category: any, date: Date): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const updateDate = function () {
                    const years = recurrence == "yearly" ? 1 : 0
                    const months = recurrence == "monthly" ? 1 : 0
                    const days = recurrence == "daily" ? 1 : 0
                    date = new Date(date.getFullYear() + years, date.getMonth() + months, date.getDate() + days)
                }
                const expenses = []
                for (let i = 0; i < 5; i++) {
                    updateDate()
                    expenses[i] = { recurrenceId: baseExpense.id, userGroup, amount, description, recurrence, category, date}
                }
                await Expense.insertMany(expenses)
                resolve();
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
                const expense = await Expense.findById(expenseId);
                await Expense.deleteMany({ recurrenceId : expense?.recurrenceId }).populate("category");
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
                const options = { page, limit, populate: {path: 'category'}, sort: { date: -1 }}
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

