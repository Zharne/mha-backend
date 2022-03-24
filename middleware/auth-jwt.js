const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

verifyToken = (req, res, next) => {
    let authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if(!token) return res.status(500).send({message: "User not logged in."})
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) return res.status(401).send({message: "Unauthorized"})
        req.userId = user._id
        next()
    })
}

module.exports = verifyToken