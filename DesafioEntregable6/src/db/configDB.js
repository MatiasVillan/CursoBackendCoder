import mongoose from "mongoose";

const uri = "mongodb+srv://coderfs:c0d3rfs@cluster0.kykyjfg.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose
    .connect(uri)
    .then(() => console.log("DB connected OK."))
    .catch((err) => console.log(err));