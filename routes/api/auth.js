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
    } catch (e) {
        console.error(e.message)
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
        check('password', 'Enter your Password with 3 or more characters').isLength({min: 3})
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array().map(el => el.msg))
        }

        const {email, password} = req.body

        try {
            //  Input data validation
            let user = await User.findOne({email})
            if (!user) {
                return res.status(400).json(['Invalid credentials'])
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json(['Invalid credentials'])
            }

            //  Return jsonwebtoken
            const payload = {user: {id: user.id}}
            const secret = config.get('jwtSecret')
            jwt.sign(payload, secret, {expiresIn: 360000}, (err, token) => {
                if (err) throw err
                res.json({token})
            })
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Server error')
        }
    })

module.exports = router