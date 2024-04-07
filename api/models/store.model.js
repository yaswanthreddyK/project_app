import mongoose, {Schema, model} from "mongoose";

const storeSchema = await Schema({
    item_title: {
        type: String,
        required: true
    },
    priceInPounds: {
        type: Number,
        required: true
    }
},{timestamps: true})

const Store = new model('store', storeSchema)

export default Store