import Customer from "../models/testModel.js";
import express from "express"
export const testInsertion = async (req , res)=>{
    const {name , email} = req.body;
    
    const newUser = new Customer({
        name:name,
        email:email
    })

    try{
        const db_response = await newUser.save();
        res.status(200).json({
            "response":db_response
        })
    }catch(error){
        console.log(error)
        res.status(200).json({
            "message":"something wrong occured"
        })

    }
}

export const testSelect = async (req , res)=>{
    const {name} = req.body;

    const results = await Customer.find({
        name:name
    })

    res.json({
        "customer":results
    })
}