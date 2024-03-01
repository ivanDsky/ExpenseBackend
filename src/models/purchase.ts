import { Schema, model, Types } from 'mongoose';

export interface IPurchase {
    item: string;
    price: number;
    category: string;
    date: Date;
    user: Types.ObjectId;

}

const purchaseSchema = new Schema<IPurchase>({
    item: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    date: {type: Date, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User' ,required: true}
},
{
    timestamps: true
})

export const Purchase = model<IPurchase>('Purchase', purchaseSchema)
