import {model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {UserToUserGroup} from "./usertousergroup";
import {UserGroup} from "./usergroup";

export interface IUser {
    firstname: string;
    lastname: string;
    middlename: string;
    email: string;
    password: string;
    role: string;
}


export interface UserLogin {
    email: string,
    password: string
}

export interface UserData extends IUser {
    getSignedJwtToken : () => Promise<string>;
    matchPassword : () => string;    
}


const UserSchema = new Schema<UserData>({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    middlename: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["user", "admin"], default : "user"}
},
{
    timestamps: true
});

// For Safety -> Before saving Encrypt Password using bcrypt
UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

// For Session Mgt -> Create a method that creates a Signed JWT using the user id for session Mgt
UserSchema.methods.getSignedJwtToken = async function() {
    const userId = this._id
    const userGroup = await UserGroup.findOne({owner: this})
    return jwt.sign( {id: userId, groupId: userGroup!!._id}, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// A Method that Checks if Entered Password equals Hashed Password
UserSchema.methods.matchPassword = async function(enteredPassword: string ){
    return await bcrypt.compare(enteredPassword, this.password);
}

UserSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;
    }
});



export const User = model<UserData>('User', UserSchema)
