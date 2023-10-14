import { Schema, model } from "mongoose";

const productsSchema = new Schema({    
    title:{
    type:String,
    required: true
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        required: true
    },   
    thumbnail:{
        type:String,
    },
    code:{
        type:String,
        required: true,
        unique: true
        },
    stock:{
        type:Number,
        default: 0
    },
    status:{
        type:Boolean,
        default: true
    },    
});

export const productsModel = model("Products", productsSchema );