import { Schema, model, mongoose } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

cartsSchema.plugin(mongoosePaginate);
export const cartsModel = model( "Cart", cartsSchema );