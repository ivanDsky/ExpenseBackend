/**
* Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import {userRouter} from "./routes/user.routes";
import {authRouter} from './routes/auth.routes';
import {db} from './db';
import morgan from "morgan";
import {expenseRouter} from "./routes/expense.routes";
import {categoryRouter} from "./routes/category.routes";

dotenv.config();
db();
/**
 * App Vaiables
 */

if (!process.env.PORT){
    console.log("Environmental Variables not found")
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 * App Configuration
 */
app.use(helmet());
app.use(cors({credentials: true}));
app.use(morgan('dev'));

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/categories", categoryRouter);

/**
 * Server Activation
 */

app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`);
})