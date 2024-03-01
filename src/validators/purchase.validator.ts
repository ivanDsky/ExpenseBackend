import Joi from 'joi'
import {IPurchase} from '../models/purchase'

export function validateCreatePurchase( purchaseDetails : IPurchase){
    const createPurchaseSchema = Joi.object().keys({
        item: Joi.string().required(),
        price: Joi.number().required(),
        category: Joi.string().required(),
        date: Joi.date().required(),
        user: Joi.string().required()

    })

    return createPurchaseSchema.validate(purchaseDetails)
}

export function validateUpdatePurchase( purchaseDetails : IPurchase){
    const updatePurchaseSchema = Joi.object().keys({
        item: Joi.string().optional(),
        price: Joi.number().optional(),
        category: Joi.string().optional(),
        date: Joi.date().optional(),
        user: Joi.string().optional()
    })

    return updatePurchaseSchema.validate(purchaseDetails)
}
