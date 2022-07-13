
const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {

    try {
        
        const token = req.cookies.token

        if(!token) return res.status(401).json('Unauthorized')

        const validated = jwt.verify(token, process.env.JWTSECRET)

        req.userId = validated.id

        next()

    } catch (error) {
        return res.status(401).json('Unauthorized')
    }

}

module.exports = auth

