import {Router} from "express"
import {sample_Users} from "../data.js";
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import { UserModel } from "../models/user.model.js";


const router=Router()



router.get("/seed", asyncHandler(
    async (req, res) => {
        const usersCount = await UserModel.countDocuments();
        if(usersCount> 0){
            res.send("Seed is already done!");
            return;
        }

        await UserModel.create(sample_Users);
        res.send("Seed Is Done!");
}
))

router.post("/login", (req, res) => {
    const {email, password} = req.body;
    const user = sample_Users.find(user => user.email === email 
        && user.password === password);

    if(user) {
        res.send(generateTokenReponse(user));
    }
    else{
        const BAD_REQUEST = 400;
        res.status(BAD_REQUEST).send("Username or password is invalid!");
    }
})

const generateTokenReponse = (user) => {
    const token = jwt.sign(
    {email:user.email, isAdmin: user.isAdmin},
    "SomeRandomText",
    {expiresIn:"30d"}
    );

    user.token = token;
    return user;
}

export default router;