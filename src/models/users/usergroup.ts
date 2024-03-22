import mongoose, {model, Schema} from "mongoose";
import {IUser} from "./user";

export interface IUserGroup {
    name: string,
    size: number,
    owner: IUser,
}

const UserGroupSchema = new Schema<IUserGroup>({
        name: {type: String, required: true},
        size: {type: Number, required: true, default: 1},
        owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    },
    {
        timestamps: true
    });

UserGroupSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;
    }
});


export const UserGroup = model<IUserGroup>('UserGroup', UserGroupSchema)