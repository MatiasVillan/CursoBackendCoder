import { Schema, model, mongoose } from "mongoose";

const cartsSchema = new Schema({
    cart: [
        {
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Products"
            },
            quantity: {
                type: Number
            }
        }
    ]
})

export const cartsModel = model( "Cart", cartsSchema );