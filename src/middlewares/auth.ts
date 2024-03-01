import jwt from 'jsonwebtoken';
import {User} from "../models/users/user";
import {Request, Response, NextFunction} from "express";

export const protect = async(req: Request, res: Response, next: NextFunction) => {

	const token = req.header('x-auth-token');

	if(!token) return next(res.status(401).json({message: 'UNAUTHORIZED!'}))

	try{
		const decoded =  jwt.verify(token, process.env.JWT_SECRET!);
		const { id } = (decoded as any)
		const currentUser = await User.findById(id);

		if(!currentUser) return next(res.status(404).json({message: 'USER NOT FOUND!'}));

		currentUser.password = '';

		(req as any).user = currentUser;
		

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

export const isAccountOwner = async(req: Request, res: Response, next: NextFunction) => {

	const token = req.header('x-auth-token');

	if(!token) return next(res.status(401).json({message: 'UNAUTHORIZED!'}))

	try{
		const decoded =  jwt.verify(token, process.env.JWT_SECRET!);

		const { id } = (decoded as any)

		const currentuser = (req as any).user ;

		if(!currentuser){
			console.log("Crashhh")
		}
		else{
			if (id != req.params.id && currentuser.role != 'SuperUser' && currentuser.role != 'admin'){
				return res.status(401).json({message: 'UNAUTHORIZED USER!'})
			}	
		}
		
		return next();
		

	}catch(e: any){

		if (e.name === 'TokenExpiredError' ){
			return next(res.status(403).json({message: 'TOKEN EXPIRED! LOGIN!'}));
		}

		else {
			return next(res.status(406).json({message: 'INVALID TOKEN! '}))
		} 
	}	

}

export const isAdmin = async(req: Request, res: Response, next: NextFunction) => {
	try{
		const currentuser = (req as any).user ;

		if(!currentuser){
			console.log("Crashhh")
		}
		else{
			if (currentuser.role != 'admin'){
				return res.status(401).json({message: 'UNAUTHORIZED USER!'})
			}	
		}
		
		return next();
		
	}catch(e: any){
			return res.status(500).json({message: e.message})
		 
	}	

}