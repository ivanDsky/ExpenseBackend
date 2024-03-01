import {IUser} from "./user";
import {model, Schema} from "mongoose";
import mongoose from "mongoose";
import {IUserGroup} from "./usergroup";

export interface IUserToUserGroup {
    user: IUser,
    userGroup: IUserGroup,
}

const UserToUserGroupSchema = new Schema<IUserToUserGroup>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'UserGroup' },
});


export const UserToUserGroup = model<IUserToUserGroup>('UserToUserGroup', UserToUserGroupSchema)