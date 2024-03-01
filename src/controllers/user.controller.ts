import {UserService} from '../services/user.service';
import {Request, Response, NextFunction} from "express";

const User = new UserService();

export const createUser = async (req: Request, res: Response, next : NextFunction) =>{
    try{
        const user = await User.createUser(req.body);
        return res.status(201).json(user)
    }  catch(e:any){
        return next(res.status(500).json(e.message))
    }
}

export const getAllUsers = async (req: Request, res: Response, next : NextFunction) =>{
    try{
        const user = await User.getAllUser();
        return res.status(200).json(user)
    }  catch(e:any){
        return next(res.status(500).json(e))
    }
}

export const getUser = async (req: Request, res: Response, next : NextFunction) =>{
    try{
        const user = await User.getUser(req.params.id);
        return res.status(200).json(user)
    }  catch(e:any){
        return next(res.status(500).json(e))
    }
}

export const updateUser = async (req: Request, res: Response, next : NextFunction) =>{
    try{
        const user = await User.updateUser(req.params.id, req.body);
        return res.status(200).json(user)
    }  catch(e:any){
        return next(res.status(500).json(e))
    }
}

export const deleteUser = async (req: Request, res: Response, next : NextFunction) =>{
    try{
        const user = await User.deleteUser(req.params.id);
        return res.status(204).json({data: user})
    }  catch(e:any){
        return next(res.status(500).json(e))
    }
}