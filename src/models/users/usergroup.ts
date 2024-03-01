import {model, Schema} from "mongoose";

export interface IUserGroup {
    name: string,
    size: number,
}

const UserGroupSchema = new Schema<IUserGroup>({
        name: {type: String, required: true},
        size: {type: Number, required: true, default: 1},
    },
    {
        timestamps: true
    });


export const UserGroup = model<IUserGroup>('UserGroup', UserGroupSchema)