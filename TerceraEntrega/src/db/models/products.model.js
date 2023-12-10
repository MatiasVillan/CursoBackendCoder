import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

productsSchema.plugin(mongoosePaginate);
export const productsModel = model("Products", productsSchema );