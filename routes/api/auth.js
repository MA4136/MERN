const express = require('express')
const router = express.Router()
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const middlewareAuth = require('../../middleware/authentication')

const User = require('../../models/User')

// route    GET api/auth
// desc     Test route
// access   Public
router.get('/', middlewareAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')

    }
})


// route    POST api/auth
// desc     Authenticate user & Get token
// access   Public
router.post('/',
    [
        // checking authorization fields
        check('email', 'Enter your Email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        console.log(req.body)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const {email, password} = req.body

        try {
            let user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({errors: [{msg: 'Invalid credentials'}]})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({errors: [{msg: 'Invalid credentials'}]})
            }

            //  Return jsonwebtoken
            const payload = {user: {id: user.id}}
            const secret = config.get('jwtSecret')
            jwt.sign(payload, secret, {expiresIn: 360000}, (err, token) => {
                if (err) throw err
                res.json({token})
            })

            // res.send('User registration is successful')
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    })

module.exports = router