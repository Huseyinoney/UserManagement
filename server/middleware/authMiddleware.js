const jwt = require("jsonwebtoken")

const createToken = (user) => {
    const token = jwt.sign({
        id: user._id,
        username:user.username,
        email:user.email,
        department:user.department,
        age:user.age,
        role:user.role
    }, process.env.SECRET_KEY, { expiresIn: "1h" })
    return token;

}
const authenticateToken = (req,res,next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) return res.status(401).json({
        msg:"Token not found"
    })
    jwt.verify(token,process.env.SECRET_KEY,(err,user) => {
        if(err) return res.sendStatus(403).json({
            msg:err
        })
        
        req.user = user
        next()
    })
}   

module.exports = {createToken,authenticateToken}