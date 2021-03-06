const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')

const User = require('../../models/User')

// route    POST api/users
// desc     Registration user
// access   Public
router.post('/',
    [
        // checking registration fields
        check('name', 'Enter your Name').not().isEmpty(),
        check('email', 'Is not email').isEmail(),
        check('password', 'Enter your Password with 3 or more characters').isLength({min: 3})
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array().map(el => el.msg))
        }

        const {name, email, password} = req.body

        try {
            //  See if user exists
            let user = await User.findOne({email})
            if (user) {
                return res.status(400).json(['user already exists'])
            }

            //  Get users gravatar
            const avatar = gravatar.url(email, {
                s: '200',   // The image size
                r: 'pg',    // The audience rating (G, R, etc.) to restrict the Gravatar to
                d: 'mp',    // The default image to display if there is no matching Gravatar
            })

            user = new User({
                name, email, password, avatar
            })

            //  Encrypt password & Save User data
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)

            await user.save()

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