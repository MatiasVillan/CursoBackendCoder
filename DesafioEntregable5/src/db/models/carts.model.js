import { Schema, model } from "mongoose";

const cartsSchema = new Schema({
    cart: []
})

export const cartsModel = model( "Cart", cartsSchema );