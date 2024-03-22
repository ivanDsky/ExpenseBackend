import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from "express";
import {UserGroup} from "../models/users/usergroup";
import {User} from "../models/users/user";

export const protect = async(req: Request, res: Response, next: NextFunction) => {

	const token = req.header('x-auth-token');

	if(!token) return next(res.status(401).json({message: 'UNAUTHORIZED!'}))

	try{
		const decoded =  jwt.verify(token, process.env.JWT_SECRET!);
		const { id, groupId} = (decoded as any)
		const currentUser = await User.findById(id);
		if(!currentUser) return next(res.status(404).json({message: 'USER NOT FOUND!'}));

		const currentUserGroup = await UserGroup.findById(groupId);
		if(!currentUserGroup) return next(res.status(404).json({message: 'USER NOT FOUND!'}));


		currentUser.password = '';

		(req as any).user = currentUser;
		(req as any).userGroup = currentUserGroup;


	}catch(e: any){

		if (e.name === 'TokenExpiredError' ){
			return next(res.status(403).json({message: 'TOKEN EXPIRED! LOGIN!'}));
		}

		else {
			return next(res.status(406).json({message: 'INVALID TOKEN! '}))
		} 
	}	

	return next()

}

export const isAdmin = async(req: Request, res: Response, next: NextFunction) => {
	try{
		const currentUser = (req as any).user ;

		if(!currentUser){
			console.log("Crashhh")
		}
		else{
			if (currentUser.role != 'admin'){
				return res.status(401).json({message: 'UNAUTHORIZED USER!'})
			}	
		}
		
		return next();
		
	}catch(e: any){
			return res.status(500).json({message: e.message})
		 
	}	

}

export const isUserGroup = async(req: Request, res: Response, next: NextFunction) => {
	try{
		const currentUserGroup = (req as any).userGroup ;

		if(!currentUserGroup){
			console.log("Crashhh")
		}

		return next();

	}catch(e: any){
		return res.status(500).json({message: e.message})
	}

}