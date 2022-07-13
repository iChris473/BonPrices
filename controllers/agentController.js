
const Agent = require("../models/Agent")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')


// CREATE FIELD AGENT
exports.createAgent = async (req, res) => {

    try {

            if( !( req.body.email.includes("@gmail") ||  
            req.body.email.includes("@hotmail") || 
            req.body.email.includes("@yahoo") ||
            req.body.email.includes("@outlook") ) ){

                return res.status(401).json("Please use a valid email")

            }
        
        const existingAgent = await Agent.findOne({email: req.body.email})

        if(existingAgent) return res.status(400).json("An account is registered with this email")

        // CREATE NEW USER MODEL

        const newAgent = new Agent(req.body)

        await newAgent.save()

        return res.status(201).json("Agent successfully created")

    } catch (error) {
    
        return res.status(400).json(error)
    }
}

// LOGIN 
exports.loginAgent = async (req, res) => {
    
    const {email, password} = req.body

    try {
        
        const existingAgent = await Agent.findOne({email})
        
        if(!existingAgent) return res.status(401).json("Enter a valid email and password")

        const validPassword = await bcrypt.compare(password, existingAgent.password)
        
        if(!validPassword) return res.status(401).json("Enter a valid email and password")

        // sends JSON_WEB_TOKEN
        const token = existingAgent.getSignedToken()   
        
        return res.cookie("token", token, {httpOnly: true})
        .send()

    } catch (error) {
        console.log(error)
        return res.status(401).json("An error occured")
    }

}

// VERIFY LOGGED IN
exports.verifyloggedIn = async (req, res) => {
    try {
        
        const token = req.cookies.token

        if(!token) return res.json(false)

        jwt.verify(token, process.env.JWTSECRET)

        return res.json(true)

    } catch (error) {
        return res.json(false)
    }
}

// LOGOUT 
exports.logOut = async (req, res) => {
    return res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send()
}