
const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
   
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    picture: {
        type: Array,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    agentId: {
        type: String,
        required: true
    },
    merchantName: String,
    merchantNumber: String,
    merchantAddress: String,

}, {timestamps: true})

module.exports = mongoose.model("Products", ProductSchema)