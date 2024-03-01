import { connect } from 'mongoose';

export const db = async() =>{
    await connect(`${process.env.MONGO_URI}`);

    console.log(`Server Running on ${process.env.PORT}`)
}