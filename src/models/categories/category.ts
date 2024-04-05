import mongoose, {model, Schema} from 'mongoose';
import {IUserGroup} from "../users/usergroup";
import paginate from 'mongoose-paginate-v2';

export interface ICategory {
    userGroup: IUserGroup,
    name: string;
    color: string;
}

const CategoryScheme = new Schema<ICategory>({
        userGroup: { type: Schema.Types.ObjectId, ref: 'UserGroup', required: true },
        name: {type: String, required: true},
        color: {type: String, required: true},
    });

CategoryScheme.plugin(paginate)

// Define the transformation function to exclude fields
CategoryScheme.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;
    }
});

export const Category = model<ICategory, mongoose.PaginateModel<ICategory>>('Category', CategoryScheme)
