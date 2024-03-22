import {UserData} from "./user";
import {model, Schema} from "mongoose";
import mongoose from "mongoose";
import {UserGroupData} from "./usergroup";

export interface IUserToUserGroup {
    user: UserData,
    userGroup: UserGroupData,
}

const UserToUserGroupSchema = new Schema<IUserToUserGroup>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'UserGroup' },
});


export const UserToUserGroup = model<IUserToUserGroup>('UserToUserGroup', UserToUserGroupSchema)