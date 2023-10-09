import express from "express";
import cors from "cors";
import foodRouter from './routers/foodRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
import { dbConnect } from "./configs/database.Config.js";

dotenv.config()

dbConnect();

const app = express();
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/foods", foodRouter);
app.use('/api/users',userRouter);



const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})
