
const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    gift: {
        type: String
    },
    email: {
        type: String,
    },
    amount: {
        type: String,
        required: true
    },
    reciept: {
        type: String
    },
    status: {
        type: String,
        default: "pending"
    }
}, {timestamps: true})

module.exports = mongoose.model("Orders", OrderSchema)
