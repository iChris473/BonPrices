
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

        const validated = jwt.verify(token, process.env.JWTSECRET)

        const agent = await Agent.findById(validated.id)

        if(!agent) return res.json(false)

        if(agent.deactivated) return res.status(200).json({deactivated: true})

        return res.json(true)

    } catch (error) {
        return res.json(false)
    }
}

// UPDATE AGENT
exports.updateAgent = async (req, res) => {
        
    const { p } = req.body;

    try {
        
        const oldAgent = await Agent.findById(req.userId)

        let newAgent = {...req.body}

        // IF UPDATE CONTAINS EMAIL
        if(req.body.email){

            const registered = await Agent.findOne({email: req.body.email})

            if(registered) return res.status(401).json("An Account is registered with this email")

            const correctPassword = await bcrypt.compare(p, oldAgent.password);

            if (!correctPassword) return res.status(401).json("Incorrect Password");

        }

        // IF UPDATE CONTAINS PASSWORD
        if (req.body.password) {
          // checks password
          const validPassword = await bcrypt.compare(p, oldAgent.password);

          if (!validPassword) return res.status(401).json("Incorrect old Password");

          const salt = await bcrypt.genSalt(10);

          const hashedPassword = await bcrypt.hash(req.body.password, salt);

          req.body.password = hashedPassword;

        }

        if(req.body.deactivated){
            
            try {
        
                const token = req.cookies.token
        
                if(!token) return res.status(401).json('Unauthorized')
        
                jwt.verify(token, process.env.SUPER_SECRET)
        
            } catch (error) {
                
                return res.status(401).json('Unauthorized')
                
            }

        }
        
        const update = await Agent.findOneAndUpdate(
            {
                _id: req.userId
            }, {
                $set: req.body
            },{new: true}
        );
        
        return res.status(200).json(update)

    } catch (error) {
        return res.status(400).json(error)
    }

}

// LOGOUT 
exports.logOut = async (req, res) => {
    return res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send()
}

// GET ONE AGENT
exports.getAgentProfile = async (req, res) => {

    try {
        
        const agnt = await Agent.findById(req.userId)

        const {password, ...others} = agnt._doc

        return res.status(200).json(others)

    } catch (error) {
        return res.status(200).json(false)
    }

}