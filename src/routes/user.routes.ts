import express from "express";
import {createUser, deleteUser, getAllUsers, getUser, updateUser} from '../controllers/user.controller';
import {purchaseRouter} from './purchase.routes';

import {protect, isAdmin} from "../middlewares/auth";

export const userRouter = express.Router();

userRouter.use('/purchase', purchaseRouter)

userRouter.route('/').get([protect, isAdmin], getAllUsers).post([protect, isAdmin],createUser);
userRouter.route('/:id').get([protect, isAdmin],getUser).put([protect, isAdmin],updateUser).delete([protect, isAdmin],deleteUser);


