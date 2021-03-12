const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
    //  Get token from header
    const token = req.header('x-auth-token')

    //  Check if no token
    if (!token) {
        return res.status(401).json({msg: 'Authorization denied. No token'})
    }

    //  Verify token
    try {
        const secret = config.get('jwtSecret')
        const decoded = jwt.verify(token, secret)
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'})
    }
}