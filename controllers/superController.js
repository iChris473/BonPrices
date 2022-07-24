
const Super = require("../models/Super")
const Agent = require("../models/Agent")
const Product = require("../models/Product")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')


// CREATE FIELD Super
exports.createSuper = async (req, res) => {

    try {

            if( !( req.body.email.includes("@gmail") ||  
            req.body.email.includes("@hotmail") || 
            req.body.email.includes("@yahoo") ||
            req.body.email.includes("@outlook") ) ){

                return res.status(401).json("Please use a valid email")

            }
        
        const existingSuper = await Super.findOne({email: req.body.email})

        if(existingSuper) return res.status(400).json("An account is registered with this email")

        // CREATE NEW USER MODEL

        const newSuper = new Super(req.body)

        await newSuper.save()

        return res.status(201).json("Super successfully created")

    } catch (error) {
    
        return res.status(400).json(error)
    }
}

// LOGIN 
exports.loginSuper = async (req, res) => {
    
    const {email, password} = req.body

    try {
        
        const existingSuper = await Super.findOne({email})
        
        if(!existingSuper) return res.status(401).json("Enter a valid email and password")

        const validPassword = await bcrypt.compare(password, existingSuper.password)
        
        if(!validPassword) return res.status(401).json("Enter a valid email and password")

        // sends JSON_WEB_TOKEN
        const token = existingSuper.getSignedToken()   
        
        return res.cookie("token", token, {httpOnly: true})
        .send()

    } catch (error) {
        console.log(error)
        return res.status(401).json("An error occured")
    }

}


// UPDATE Super
exports.updateSuper = async (req, res) => {
        
    const { p } = req.body;

    try {
        
        const oldSuper = await Super.findById(req.userId)

        let newSuper = {...req.body}

        // IF UPDATE CONTAINS EMAIL
        if(req.body.email){

            const registered = await Super.findOne({email: req.body.email})

            if(registered) return res.status(401).json("An Account is registered with this email")

            const correctPassword = await bcrypt.compare(p, oldSuper.password);

            if (!correctPassword) return res.status(401).json("Incorrect Password");

        }

        // IF UPDATE CONTAINS PASSWORD
        if (req.body.password) {
          // checks password
          const validPassword = await bcrypt.compare(p, oldSuper.password);

          if (!validPassword) return res.status(401).json("Incorrect old Password");

          const salt = await bcrypt.genSalt(10);

          const hashedPassword = await bcrypt.hash(req.body.password, salt);

          req.body.password = hashedPassword;

        }
        
        const update = await Super.findOneAndUpdate(
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

// IS LOGGED IN
exports.isSupperLoggedIn = async (req, res) => {

    try {
        
        const token = req.cookies.token

        if(!token) return res.json(false)

        const validated = jwt.verify(token, process.env.SUPER_SECRET)

        const superAdmin = await Super.findById(validated.id)

        if(!superAdmin) return res.json(false)

        return res.json(true)

    } catch (error) {
        return res.json(false)
    }

}

// GET ALL AGENTS
exports.getAllAgents = async (req, res) => {

    try {

        const allagents = await Agent.find({})

        return res.status(200).json(allagents)

    } catch (error) {
        return res.status(404).json(error)
    }

}

// GET ONE
exports.getOneAgent = async (req, res) => {

    try {

        const agnt = await Agent.findById(req.params.id)

        return res.status(200).json(agnt)

    } catch (error) {
        return res.status(404).json(error)
    }

}

//  UPDATE AGENT
exports.updateAgent = async (req, res) => {

    try {
        
        const oldAgent = await Agent.findById(req.params.id)

        if(!oldAgent) return res.status(404).json("Oops, Agent not found");

        // IF UPDATE CONTAINS EMAIL
        if(req.body.email){

            const registered = await Agent.findOne({email: req.body.email})

            if(registered) return res.status(401).json("An Agent is registered with this email");

        }
        
        if(req.body.password){

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashedPassword

        }

        const update = await Agent.findOneAndUpdate(
            {
                _id: req.params.id
            }, {
                $set: req.body
            },{new: true}
        );
        
        return res.status(200).json(update)

    } catch (error) {
        return res.status(400).json(error)
    }

}

// DELETE AGENT
exports.deleteAgent = async (req, res) => {

    try {

        await Agent.findByIdAndDelete(req.params.id)
        
        return res.status(200).json("Agent Deleted")
 
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

// GET ALL PRODUCTS 
exports.getAllProducts = async (req, res) => {
    
    try {
        
        let query = Product.find();
        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.limit) || 50
        const skip = (page - 1) * pageSize
        const total = await Product.countDocuments()
        const pages = Math.ceil( total / pageSize )
        query = query.skip(skip).limit(pageSize)
        const results = await query

        if(page > pages) {
            return res.status(404).json('page not found')
        }

        return res.status(200).json({
            count: results.length,
            page,
            pages,
            data: results
        })

        
    } catch (error) {
        return res.status(400).json(error)
    }

}

