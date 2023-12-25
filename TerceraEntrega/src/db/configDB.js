import mongoose from "mongoose";
import config from "../config.js"

const uri = config.mongo_uri;

mongoose
    .connect(uri)
    .then(() => console.log("DB connected OK."))
    .catch((err) => console.log(err));