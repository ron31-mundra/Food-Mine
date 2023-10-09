import {Router} from "express"
import { sample_foods, sample_tags } from "../data.js";
import asyncHandler from 'express-async-handler';
import { FoodModel } from "../models/food.model.js";


const router=Router()

router.get("/seed", asyncHandler(
    async (req, res) => {
        const foodsCount = await FoodModel.countDocuments();
        if(foodsCount> 0){
            res.send("Seed is already done!");
            return;
        }
        await FoodModel.create(sample_foods);
        res.send("Seed Is Done!");
    }
))

router.get("/", (req, res) => {
    res.send(sample_foods);
})

router.get("/search/:searchTerm", (req, res) => {
    const searchTerm  = req.params.searchTerm;
    const foods = sample_foods.filter(food => food.name.toLowerCase()
    .includes(searchTerm.toLowerCase()));
    res.send(foods);
})

router.get('/tags',(req,res)=>{
    res.send(sample_tags)
})

router.get('/tag/:tagName',(req,res)=>{
    const tagName = req.params.tagName;
    const foods = sample_foods
    .filter(food => food.tags?.includes(tagName));
    res.send(foods);
})

router.get('/:foodId',(req,res)=>{
    const foodId=req.params.foodId;
    const foods=sample_foods.find(food=>food.food_id==foodId) 
    res.send(foods)
})



export default router;