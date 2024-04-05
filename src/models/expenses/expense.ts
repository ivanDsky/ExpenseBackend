import mongoose, { Schema, Document } from 'mongoose';
import {ICategory} from "../categories/category";
import {IUserGroup} from "../users/usergroup";
import paginate from "mongoose-paginate-v2";
import bcrypt from "bcrypt";

export interface IExpense extends Document {
    userGroup: IUserGroup,
    amount: number;
    description: string;
    recurrence: string;
    recurrenceId: Schema.Types.ObjectId;
    category: ICategory;
    date: Date;
}

const ExpenseSchema: Schema = new Schema({
    userGroup: { type: Schema.Types.ObjectId, ref: 'UserGroup', required: true },
    amount: { type: Number, required: true },
    description: { type: String, default: "" },
    recurrence: { type: String, required: true },
    recurrenceId: { type: Schema.Types.ObjectId },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    date: { type: Date, default: Date.now },
});

ExpenseSchema.pre('save', async function(next){
    this.recurrenceId = this.id
});

ExpenseSchema.plugin(paginate)

// Define the transformation function to exclude fields
ExpenseSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.category = ret.category.name
        delete ret.userGroup;
        delete ret.recurrenceId;
        // Exclude the '__v' field
        delete ret.__v;
    }
});

export const Expense = mongoose.model<IExpense, mongoose.PaginateModel<IExpense>>('Expense', ExpenseSchema);