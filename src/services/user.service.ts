import {User, IUser} from '../models/users/user';
import {IUserGroup, UserGroup} from "../models/users/usergroup";
import {UserToUserGroup} from "../models/users/usertousergroup";


export class UserService {
    createUser (body: IUser){
        return new Promise(async(resolve, reject) => {
            try{
                const user = await User.create(body);

                const userGroup: IUserGroup = await UserGroup.create(
                    {
                        name: body.email,
                        size: 1,
                        owner: user,
                    }
                )

                await UserToUserGroup.create(
                    {
                        user: user,
                        userGroup: userGroup
                    }
                )

                return resolve(user);
            }
            catch (e: any){
                e.source = 'Create User Service';
                return reject(e)
            }
        })
    }

    getAllUser (){
        return new Promise(async(resolve, reject) => {
            try{
                const users = await User.find();
                return resolve(users)
            }
            catch(e: any){
                e.source = 'Get User Service';
                return reject(e)
            }
        })
    }

    getUser (userid:  string){
        return new Promise(async(resolve, reject) => {
            try{
                const user = await  User.findById(userid);
                if (user) return resolve(user);

                reject('User Not Found!')
            }
            catch(e : any){
                e.source = 'Get User Service';
                return reject(e)
            }
        })
    }

    updateUser (userid:  string, body: [any]) {
        return new Promise(async(resolve, reject) => {
            try{
                let user = await User.findById(userid);
                if(!user) return reject('User not found!')

                user = await User.findByIdAndUpdate(userid, body, { new: true, runValidators: true})
                return resolve(user)
            } catch (e: any){
                e.source = 'Update User Service';
                return reject(e)
            }
        })
    }

    deleteUser(userid:  string) {
        return new Promise(async(resolve, reject) => {
            try{
                let user = await User.findById(userid);
                if(!user) return reject('User not found!')

                user = await User.findByIdAndDelete(userid)
                return resolve(user)
            } catch (e: any){
                e.source = 'Update User Service';
                return reject(e)
            }
        })
    }

}
