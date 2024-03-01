import Joi from 'joi'
import {UserLogin, IUser} from '../models/user'

type UserSignUp = Omit<IUser, "cash">

export const validateLogin = ( loginDetails : UserLogin) => {
    const loginSchema = Joi.object().keys({
        email :  Joi.string().required(),
        password: Joi.string().required()
    })

    return loginSchema.validate(loginDetails)
}

export const validateSignup = ( signupDetails : UserSignUp) => {
    
    const signupSchema = Joi.object().keys({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        phone: Joi.number().required(),
        email :  Joi.string().required(),
        password: Joi.string().required(),
        dob: Joi.date().required()
    })

    return signupSchema.validate(signupDetails)
}