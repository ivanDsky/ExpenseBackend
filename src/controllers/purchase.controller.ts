import {PurchaseService} from '../services/purchase.service';
import {Request, Response, NextFunction} from "express";
import {validateCreatePurchase, validateUpdatePurchase} from '../validators/purchase.validator'

const Purchase = new PurchaseService();

export const createPurchase = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const {error } = validateCreatePurchase(req.body)
        if(error){
            return next(res.status(400).json({success: false, message: error.details[0].message}))
        }
        const purchase = await Purchase.createPurchase(req.body);
        return res.status(201).json(purchase); 
        
    }  catch(e:any){
        return next(res.status(e.code? e.code : 500).json({success: false, message: e.message}))
    }
}

export const getAllPurchases = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const purchase = await Purchase.getAllPurchase(req.query);

        return res.status(200).json(purchase)
    }  catch(e:any){
        return next(res.status(500).json({success: false, message: e.message}))
    }
}


export const getUserPurchases = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const purchase = await Purchase.getUserPurchase(req.params.id);
        
        return res.status(200).json(purchase)
    }  catch(e:any){
        return next(res.status(500).json({success: false, message: e.message}))
    }
}

export const getPurchase = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const purchase = await Purchase.getPurchase(req.params.id);
        
        return res.status(200).json(purchase)
    }  catch(e:any){
        return next(res.status(500).json({success: false, message: e.message}))
    }
}

export const updatePurchase = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const {error } = validateUpdatePurchase(req.body)
        if(error){
            return next(res.status(400).json({success: false, message: error.details[0].message}))
        }
        const purchase = await Purchase.updatePurchase(req.params.id, req.body);
        
        return res.status(200).json(purchase)
    }  catch(e:any){
        console.log(e.message)
        return next(res.status(e.code? e.code : 500).json({success: false, message: e.message}))
    }
}

export const deletePurchase = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const purchase = await Purchase.deletePurchase(req.params.id);
        
        return res.status(204).json({data: purchase})
    }  catch(e:any){
        return next(res.status(500).json({success: false, message: e.message}))
    }
}