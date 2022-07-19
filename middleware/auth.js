
const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {

    try {
        
        const token = req.cookies.token

        if(!token) return res.status(401).json('Unauthorized')

        jwt.verify(token, process.env.JWTSECRET, (err, user) => {

            if(err){
                jwt.verify(token, process.env.SUPER_SECRET, (error, superAdmin) => {

                    if(error) return res.status(401).json('Unauthorized')
                    
                    req.userId = superAdmin.id
                    
                })
            } else {

                req.userId = user.id
            }

            next()
        })
        
    } catch (error) {
        console.log("error")
        return res.status(401).json('Unauthorized')
    }

}

module.exports = auth

