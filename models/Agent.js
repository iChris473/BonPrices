const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

const AgentSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    state: {
        type: String,
    },
    lga: {
        type: String,
    },
    phone: {
        type: String,
    },
    name: {
        type: String
    }

}, {timestamps: true})

AgentSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next()
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})

AgentSchema.methods.getSignedToken = function(){
    return jwt.sign({id: this._id}, process.env.JWTSECRET, {expiresIn: '9999y'})
}

module.exports = mongoose.model("agent", AgentSchema)