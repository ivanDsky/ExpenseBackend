import express from "express";
import { createPurchase, deletePurchase,getAllPurchases,getPurchase, updatePurchase, getUserPurchases} from '../controllers/purchase.controller';
import {protect, isAccountOwner} from "../middlewares/auth";


export const purchaseRouter = express.Router();

purchaseRouter.route('/').get([protect, isAccountOwner],getAllPurchases).post(protect,createPurchase);
purchaseRouter.route('/:id').get([protect, isAccountOwner ],getPurchase).put([protect, isAccountOwner],updatePurchase).delete([protect, isAccountOwner],deletePurchase);
purchaseRouter.route('/user/:id').get([protect, isAccountOwner],getUserPurchases);

