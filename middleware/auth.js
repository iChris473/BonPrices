
const jwt = require("jsonwebtoken")
const Agent = require("../models/Agent")

const auth = async (req, res, next) => {

    try {
        
        const token = req.cookies.token

        if(!token) return res.status(401).json('Unauthorized')

        jwt.verify(token, process.env.JWTSECRET, async (err, user) => {

            if(err){
                jwt.verify(token, process.env.SUPER_SECRET, (error, superAdmin) => {

                    if(error) return res.status(401).json('Unauthorized')
                    
                    req.userId = superAdmin.id
                    
                })
            } else {

                const agent = await Agent.findById(user.id)

                if(!agent) return res.status(401).json('Account does not exist')
        
                if(agent.deactivated) return res.status(200).json({deactivated: true})

                req.userId = user.id
                
                if(req.originalUrl.includes("/product/create") || req.originalUrl.includes("/product/update/")){
                    req.body.agentEmail = agent.email
                }
               
            }

            next()
        })
        
    } catch (error) {
        console.log("error")
        return res.status(401).json('Unauthorized')
    }

}

module.exports = auth

