import {User, UserData, IUser, UserLogin} from '../models/user';

export class AuthService{
	signUp (body: IUser){
        return new Promise<{user: UserData, token: string}>(async(resolve, reject) => {
            try{
                let existingUser = await User.find({email : body.email})

                if(existingUser.length > 0){
                    return reject({code : 400, message: "User Exist!"})
                }
                const user: UserData = await User.create(body);
                
                const token = user.getSignedJwtToken();

                return resolve({user, token});
            }
            catch (e: any){
                if(e.message.includes('validation failed')){
                    return reject({code: 400, message: e.message})
                }
                e.source = 'Sign-Up Service';
                return reject(e)
            }
        })
    }

    login (body: UserLogin) {
        return new Promise<{user: string, token: string}>(async(resolve, reject) => {
            try{
                
                const {email, password} = body;
                
                const user : UserData | any= await User.findOne({email: email}).select('+password');

               
                if (!user) reject('FALSE-INFO!');

 				const isMatch =  await user.matchPassword(password); 
                if(!isMatch) reject({status: 401, message:'Invalid Inforamtion Supplied!'});

                user.password = undefined;

                const token: string = user.getSignedJwtToken();

                if(!token) reject ('Could not Sign In User');
                


                resolve({user, token} )
            }
            catch(e : any){
                e.source = 'Get User Service';
                return reject(e)
            }
        })
    }


}

